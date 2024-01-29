import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import { UsersRepoService } from 'src/repos/users-repo/users-repo.service';
import { JwtService } from '@nestjs/jwt';
import { IncorrectCredentialsException } from 'src/core/exceptions/incorrect-credentials-exception';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found.exception';
import { IncorrectAdminException } from 'src/core/exceptions/incorrect-admin.exception';
import { UnauthorizedLoginException } from 'src/core/exceptions/unauthorized-login.exception';
import * as Bcrypt from 'bcrypt'
import { User } from 'src/core/entities/user';

const mockUsersRepo = {
  findByUsername : jest.fn()
};

const mockjwt = {
  sign : jest.fn()
};

let user : User = {
  name: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  rol: '',
  photoURL: '',
  phone: '',
  birthDate: '',
  nationality: '',
  isAnonymous: false
}

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
      let mockcrypt = jest.spyOn(Bcrypt, 'compareSync');
      mockcrypt.mockReturnValue(false);
      mockUsersRepo.findByUsername.mockResolvedValue(user);
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''})).rejects.toBeInstanceOf(IncorrectCredentialsException);
    });

    it('should reject if the adminId of the user does not align with the requested login', async () => {
      let mockcrypt = jest.spyOn(Bcrypt, 'compareSync');
      mockcrypt.mockReturnValue(true);
      let newUser = {...user};
      newUser.adminId = 'test'
      mockUsersRepo.findByUsername.mockResolvedValue(newUser);
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: ''})).rejects.toBeInstanceOf(IncorrectAdminException);
    });

    it('should reject if the userId is not equal to the adminId requesting the session for employees', async () => {
      let mockcrypt = jest.spyOn(Bcrypt, 'compareSync');
      mockcrypt.mockReturnValue(true);
      let newUser = {...user};
      newUser['_id'] = 'tres'
      mockUsersRepo.findByUsername.mockResolvedValue(newUser);
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: 'tes'})).rejects.toBeInstanceOf(IncorrectAdminException);
    });

    it('should reject if the credentials are not of type employee or admin', async () => {
      let mockcrypt = jest.spyOn(Bcrypt, 'compareSync');
      mockcrypt.mockReturnValue(true);
      let newUser = {...user};
      newUser.adminId = 'test'
      newUser.rol = 'customer'
      mockUsersRepo.findByUsername.mockResolvedValue(newUser);
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: 'test'})).rejects.toBeInstanceOf(UnauthorizedLoginException);
    });

    it('should successfully logs in', async () => {
      let mockcrypt = jest.spyOn(Bcrypt, 'compareSync');
      mockjwt.sign.mockReturnValue("newasdfsadf")
      mockcrypt.mockReturnValue(true);
      let newUser = {...user};
      newUser.adminId = 'test'
      newUser['_id'] = '1234';
      newUser.rol = 'employee'
      mockUsersRepo.findByUsername.mockResolvedValue(newUser);
      await expect(service.loginWithUserPassword({username: '', password: '', adminId: 'test'}))
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
