import { Injectable } from '@nestjs/common';

import { db } from 'src/main';
import { mail } from './email.controller';

@Injectable()
export class EmailService {

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
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" style="padding: 70px 15px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px;">
                    <tr>
                      <td align="center" valign="top" style="padding: 70px 15px; background-color: #262d3c;">

                        <img src="${urlImage}" width="150" height="150" style="display: block; border: 0px;">

                        <h1 style="color: #ffffff; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-top: 30px;">Hello, ${clientName}!</h1>
                        <p style="color: #a1a3a8; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px;">Use this QR code for coat check-in at the club. Show this code at the entrance for access.</p>
                      
                      </td>
                    </tr>
                  </table>
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
}
