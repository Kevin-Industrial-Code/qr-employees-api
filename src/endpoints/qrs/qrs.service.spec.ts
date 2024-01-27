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
    hanger: undefined,
    services: [],
    slot: null,
    active: false,
    used: false,
    entry: false,
    breaks: [],
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

    it("should reject an error as there is no qr returned", () => {
      mockRepo.findOne.mockResolvedValue(null)
      expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(QRNotFoundException);
    });

    it("should reject the break as the club id stored inside the qr is not a valid club id", () => {
      mockRepo.findOne.mockResolvedValue(qr);
      mockClubs.findClub.mockResolvedValue(null);
      expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(ClubNotFoundException)
    });

    it("should reject the break time as the qr lacks of hanger", () => {
      let newQr: Partial<Qr> = { ...qr };
      delete newQr.hanger;
      mockRepo.findOne.mockResolvedValue(newQr);
      mockClubs.findClub.mockResolvedValue(club);
      expect(service.takeBreakTime("test")).rejects.toBeInstanceOf(QrNotCandidateForBreakException);
    });

    it("should reject the break as it does have an active break ongoing", () => { });

    it("should reject as the qr has reached its maximum numbers of breaks", () => { });

    it("should reject the break as the qr could not be detached from the hanger", () => { });

    it("should reject the break as the qr has been expired", () => { });

    it("should undo the cronjob as the qr could not be successfully recorded on db", () => { });

    // it("should post a break successfully", async () => {
    // mockRepo.findOne.mockResolvedValue(qr);
    // mockClubs.findClub.mockResolvedValue(club);
    // await expect(service.takeBreakTime("testing")).resolves.toBeInstanceOf(Message);
    // });

  })
});
