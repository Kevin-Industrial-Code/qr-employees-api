import { Test, TestingModule } from '@nestjs/testing';
import { QrsService } from './qrs.service';
import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';
import { Document, Model, Types } from 'mongoose';
import { Qr } from 'src/core/entities/qr';
import { ClubsRepoService } from 'src/repos/clubs-repo/clubs-repo.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { HangersService } from '../hangers/hangers.service';
import { Message } from 'src/core/shared/message';
import { Club } from 'src/core/entities/club';
import { QRNotFoundException } from 'src/core/exceptions/qr-not-found-exception';
import { QrNotCandidateForBreakException } from 'src/core/exceptions/qr-not-candidate-for-break.exception';
import { ClubNotFoundException } from 'src/core/exceptions/club-not-found.exception';
import { ActiveBreakException } from 'src/core/exceptions/active-break-exception';
import { MaximumBreaktimesExceededException } from 'src/core/exceptions/maximum-breaktimes-exceeded-exception';
import { DetachEntityException } from 'src/core/exceptions/detach-entity-exception';
import { ExpiredQrException } from 'src/core/exceptions/expired-qr-exception';
import { BreakNotRecordedException } from 'src/core/exceptions/break-not-recorded-exception';


describe('QrsService', () => {
  let service: QrsService;
  const mockRepo = {
    listQrsByClubId: jest.fn(),
    findOne: jest.fn(),
    assignHanger: jest.fn(),
    detachHanger: jest.fn(),
    assignSlot: jest.fn(),
    detachSlot: jest.fn(),
    update: jest.fn(),
    createQr: jest.fn(),
    disableOldQrs: jest.fn()
  };
  const mockClubs = {
    findClub: jest.fn()
  };
  const mockRegistry = {
    deleteCronJob: jest.fn(),
    addCronJob: jest.fn(),
  };
  const mockHangers = {
    detach: jest.fn()
  };
  let qr: Partial<Qr> = {
    orderId: '',
    clubId: '',
    name: '',
    email: '',
    photo: '',
    paymentStatus: false,
    hanger: {
      _id: {
        toString: jest.fn(() => "test")
      },
      locationId: null,
      name: "",
      status: null
    } as any,
    services: [],
    slot: null,
    active: false,
    used: false,
    entry: false,
    breaks: [
      {} as any,
      {} as any,
      {} as any
    ],
    paymentType: '',
    activeBreak: false
  }

  let club: Partial<Club> = {
    breakTime: 20,
    breakNumber: 3,
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QrsService,
        {
          provide: QrRepoService,
          useValue: mockRepo
        },
        {
          provide: ClubsRepoService,
          useValue: mockClubs
        },
        {
          provide: SchedulerRegistry,
          useValue: mockRegistry
        },
        {
          provide: HangersService,
          useValue: mockHangers
        }
      ],
    }).compile();

    service = module.get<QrsService>(QrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("listQrs", () => {
    it("", () => {

    })
  });

  describe("takeBreakTime", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should reject an error as there is no qr returned", async () => {
      mockRepo.findOne.mockResolvedValue(null)
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(QRNotFoundException);
    });

    it("should reject the break as the club id stored inside the qr is not a valid club id", async () => {
      mockRepo.findOne.mockResolvedValue(qr);
      mockClubs.findClub.mockResolvedValue(null);
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(ClubNotFoundException)
    });

    it("should reject the break time as the qr lacks of hanger", async () => {
      let newQr: Partial<Qr> = { ...qr };
      delete newQr.hanger;
      mockRepo.findOne.mockResolvedValue(newQr);
      mockClubs.findClub.mockResolvedValue(club);
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(QrNotCandidateForBreakException);
    });

    it("should reject the break as it does have an active break ongoing", async () => {
      let newQr: Partial<Qr> = { ...qr };
      newQr.activeBreak = true;
      mockRepo.findOne.mockResolvedValue(newQr);
      mockClubs.findClub.mockResolvedValue(club);
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(ActiveBreakException);
    });

    it("should reject as the qr has reached its maximum numbers of breaks", async () => {
      let newQr: Partial<Qr> = { ...qr };
      newQr.activeBreak = false;
      mockRepo.findOne.mockResolvedValue(newQr);
      mockClubs.findClub.mockResolvedValue(club);
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(MaximumBreaktimesExceededException);
    });

    it("should reject the break as the qr could not be detached from the hanger", async () => {
      let newQr: Partial<Qr> = { ...qr };
      newQr.activeBreak = false;
      newQr.breaks = [];
      mockRepo.findOne.mockResolvedValue(newQr);
      mockClubs.findClub.mockResolvedValue(club);
      mockHangers.detach.mockRejectedValue(new DetachEntityException(new Error("could not process the request")));
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(DetachEntityException);
    });

    it("should reject the break as the qr has been expired", async () => {
      let newQr: Partial<Qr> = { ...qr };
      newQr.activeBreak = false;
      newQr.breaks = [];
      qr.active = false;
      mockRepo.findOne.mockResolvedValue(newQr);
      mockClubs.findClub.mockResolvedValue(club);
      mockHangers.detach.mockResolvedValue(null);

      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(ExpiredQrException);
    });

    it("should undo the cronjob as the qr could not be successfully recorded on db", async () => {
      await expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(BreakNotRecordedException);
    });

    it("should post a break successfully", async () => {
      await expect(service.takeBreakTime("testing")).resolves.toBeInstanceOf(Message);
    });

  })
});
