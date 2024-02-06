import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import moment from 'moment';
import { db } from 'src/main';

import { Qr } from 'src/core/entities/qr';

import { mail } from './email.controller';

import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';
import { ClubsRepoService } from 'src/repos/clubs-repo/clubs-repo.service';
import { Club } from 'src/core/entities/club';


@Injectable()
export class EmailService {

  logoQRCoats: string = 'https://firebasestorage.googleapis.com/v0/b/qr-coats-9f2e2.appspot.com/o/logos%2Flogo.png?alt=media&token=1e5de1fc-3fda-4b88-81ee-90267723321e';

  constructor(
    private qrRepo: QrRepoService,
    private clubsRepo: ClubsRepoService
  ) { }

  async sendEmail(mail: mail): Promise<any> {

    const { email, clientName, urlImage } = mail;
    const emailContent = {
      to: email,
      message: {
        subject: 'QR Coats: Your code is here!',
        text: 'The QR code is attached to this email.',
        html: `
          <!DOCTYPE html>
          <html lang="en">

          <head>
            <style type="text/css">
              body, table, td, a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                margin: 0;
                padding: 0;
                height: 100% !important;
                width: 100% !important;
              }
              
              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }
              table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
            </style>
          </head>

          <body style="margin: 0; padding: 0; background-color: #f8f9fc;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px;">
              <tr>
                <td align="center" valign="top" style="padding: 70px 15px; background-color: #262d3c;">

                  <img src="${urlImage}" width="150" height="150" style="display: block; border: 0px;">

                  <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-top: 30px;">Hello, ${clientName}!</h1>
                  <p style="color: #a1a3a8; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">Use this QR code for coat check-in at the club.</p>
                
                  <img src="${this.logoQRCoats}" width="100" height="100" style="display: block; border: 0px;">
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      },
    };

    try {
      const docRef = await db.collection('mail').add(emailContent);
      return docRef.id;
    } catch (error) {
      throw new Error('ERROR SENDING EMAIL');
    }
  }

  async emailForgottenItems(qr: Qr, club: Club): Promise<any> {
    const { email, name } = qr;
    const { closingHour, openingHour } = club;
    const emailContent = {
      to: email,
      message: {
        subject: 'QR Coats: Don\'t Forget About Us... Nor Your Belongings!',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          
          <head>
            <style type="text/css">
              body, table, td, a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                margin: 0;
                padding: 0;
                height: 100% !important;
                width: 100% !important;
              }
              
              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }
              table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
            </style>
          </head>
          
          <body style="margin: 0; padding: 0; background-color: #f8f9fc;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px;">
              <tr>
                <td align="center" valign="top" style="padding: 70px 15px; background-color: #262d3c;">
                  <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-top: 30px;">Oops! It Seems You've Left Something Behind ${name}!</h1>
                  <p style="color: #a1a3a8; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">
                    We noticed that you forgot an item at the club  ${club.name} last night. You can come to pick it up at ${moment(openingHour, "HH:mm").format("hh:mm A")} today. We're keeping it safe for you.
                  </p>
                  <img src="${this.logoQRCoats}" width="100" height="100" style="display: block; border: 0px;">
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      },
    };

    try {
      const docRef = await db.collection('mail').add(emailContent);
      return docRef.id;
    } catch (error) {
      throw new Error('ERROR SENDING EMAIL');
    }
  }

  @Cron("0 0 * * * *")
  async sendEmailForgottenItems() {
    try {
      
      const clubs = await this.clubsRepo.findAllClubs({
        emailForgottenItems: false
      });

      const now = moment();

      for (const club of clubs || []) {

        const closingMoment = moment(club.closingHour, "HH:mm");

        if (closingMoment.isAfter(now)) {
          closingMoment.subtract(1, 'days');
        }

        const hoursSinceClosing = now.diff(closingMoment, 'hours');

        if (hoursSinceClosing > 3) {

          const qrCodes = await this.qrRepo.listQrsByClubId( club._id.toString() );
    
          for (const qr of qrCodes || []) {
            //Enviamos el correo de los articulos olvidados
            await this.emailForgottenItems(qr, club)
          }
          //Cambiamos emailForgottenItems: true para notificar que ya se enviaron los correos de articulos olvidados
          await this.clubsRepo.changeEmailForgottenItems( club._id.toString(), true );
        } 
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

}
