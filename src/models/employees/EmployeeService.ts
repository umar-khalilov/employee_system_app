import { NotFoundException } from '../../common/exceptions/NotFoundException';
import { EmployeeEntity } from './EmployeeEntity';
import { EmployeeRepository, employeeRepository } from './EmployeeRepository';
import { LoggerService } from '../../common/services/LoggerService';
import { EmployeeDto } from './dtos/EmployeeDto';
import { BadRequestException } from '../../common/exceptions/BadRequestException';
import { IEmployee } from './interfaces/IEmployee';
import { QueryParamsDto } from './dtos/QueryParamsDto';
import { HashService } from '../../common/services/HashService';
import { ResponseEmployeeDto } from './dtos/ResponseEmployeeDto';

export class EmployeeService implements IEmployee {
    private static readonly instance: EmployeeService;
    private readonly logger: LoggerService;
    private readonly employeeRepository: EmployeeRepository;
    private readonly hashService: HashService;

    constructor() {
        if (EmployeeService.instance) {
            return EmployeeService.instance;
        }
        this.logger = new LoggerService(EmployeeService.name);
        this.employeeRepository = employeeRepository;
        this.hashService = new HashService();
        this.logger.log('Initialized');
    }

    async createOneEmployee(data: EmployeeDto): Promise<EmployeeEntity> {
        const createdEmployee = await this.employeeRepository.createOne(data);
        if (!createdEmployee) {
            throw new BadRequestException();
        }
        return createdEmployee;
    }

    async findEmployeeByEmail(email: string): Promise<EmployeeEntity> {
        return this.employeeRepository.findByEmail(email);
    }

    async findOneEmployee(id: number): Promise<ResponseEmployeeDto> {
        const foundEmployee = await this.employeeRepository.findOne(id);
        if (!foundEmployee) {
            throw new NotFoundException(
                `Employee with that id: ${id} not found`,
            );
        }
        return new ResponseEmployeeDto(foundEmployee);
    }

    async findAllEmployees(
        query: QueryParamsDto,
    ): Promise<ResponseEmployeeDto[]> {
        const employees = await this.employeeRepository.findAll(query);
        if (!employees.length) {
            throw new NotFoundException('Not found employees in database');
        }
        return employees.map(employee => new ResponseEmployeeDto(employee));
    }

    async updateOneEmployee(
        id: number,
        data: EmployeeDto,
    ): Promise<ResponseEmployeeDto> {
        if (data.password) {
            await this.hashService.passwordHash(data.password);
        }
        const updatedEmployee = await this.employeeRepository.updateOne(
            id,
            data,
        );

        if (!updatedEmployee) {
            throw new NotFoundException(
                `Employee with that id: ${id} not found`,
            );
        }
        return new ResponseEmployeeDto(updatedEmployee);
    }

    async removeOneEmployee(id: number): Promise<boolean> {
        const isRemoved = await this.employeeRepository.removeOne(id);
        if (!isRemoved) {
            throw new NotFoundException(
                `Employee with that: ${id} was not found`,
            );
        }
        return isRemoved;
    }
}

export const employeeService = new EmployeeService();
