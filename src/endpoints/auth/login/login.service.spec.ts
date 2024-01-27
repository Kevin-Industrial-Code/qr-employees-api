import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UsersRepoService } from 'src/repos/users-repo/users-repo.service';
import { JwtService } from '@nestjs/jwt';
import { IncorrectCredentialsException } from 'src/core/exceptions/incorrect-credentials-exception';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found.exception';
import { IncorrectAdminException } from 'src/core/exceptions/incorrect-admin.exception';
import { UnauthorizedLoginException } from 'src/core/exceptions/unauthorized-login.exception';

const mockUsersRepo = {
  findByUsername : jest.fn()
};

const mockjwt = {
  sign : jest.fn()
};

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: UsersRepoService,
          useValue: mockUsersRepo
        },
        {
          provide: JwtService,
          useValue: mockjwt
        }
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('session signin', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should reject if the user is not found', async () => {
      await expect(service.loginWithUserPassword({username: '', password: '', adminId : ''})).rejects.toBeInstanceOf(UserNotFoundException);
    });

    it('should reject if the password is not correct to the user', async () => {
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''})).rejects.toBeInstanceOf(IncorrectCredentialsException);
    });

    it('should reject if the adminId of the user does not align with the requested login', async () => {
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''})).rejects.toBeInstanceOf(IncorrectAdminException);
    });

    it('should reject if the userId is not equal to the adminId requesting the session for employees', async () => {
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''})).rejects.toBeInstanceOf(IncorrectAdminException);
    });

    it('should reject if the credentials are not of type employee or admin', async () => {
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''})).rejects.toBeInstanceOf(UnauthorizedLoginException);
    });

    it('should successfully logs in', async () => {
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''}))
      .resolves.toMatchObject({
        access_token : expect.any(String),
        email : expect.any(String),
        id : expect.any(String),
        name : expect.any(String),
        rol : expect.any(String),
        username : expect.any(String),
      });
    });

  });
});
