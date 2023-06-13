import { NotFoundException } from '@/common/exceptions/NotFoundException';
import { EmployeeEntity } from './EmployeeEntity';
import { EmployeeRepository } from './EmployeeRepository';
import { LoggerService } from '@/common/services/LoggerService';
import { CreateEmployeeDto } from './dtos/CreateEmployeeDto';
import { BadRequestException } from '@/common/exceptions/BadRequestException';
import { IEmployee } from './interfaces/IEmployee';

export class EmployeeService implements IEmployee {
    private readonly logger: LoggerService;
    private readonly employeeRepository: EmployeeRepository;

    constructor() {
        this.logger = new LoggerService(EmployeeService.name);
        this.employeeRepository = new EmployeeRepository();
        this.logger.log('Initialized');
    }

    async createOneEmployee(data: CreateEmployeeDto): Promise<EmployeeEntity> {
        const createdEmployee = await this.employeeRepository.createOne(data);
        if (!createdEmployee) {
            throw new BadRequestException();
        }
        return createdEmployee;
    }

    async findOneEmployee(id: number): Promise<EmployeeEntity> {
        const foundEmployee = await this.employeeRepository.findOne(id);
        if (!foundEmployee) {
            throw new NotFoundException(
                `Employee with that id: ${id} not found`,
            );
        }
        return foundEmployee;
    }

    async findAllEmployees(): Promise<EmployeeEntity[]> {
        const employees = await this.employeeRepository.findAll();
        if (!employees.length) {
            throw new NotFoundException('Not found employees in database');
        }
        return employees;
    }

    async updateOneEmployee(
        id: number,
        data: CreateEmployeeDto,
    ): Promise<EmployeeEntity> {
        const updatedEmployee = await this.employeeRepository.updateOne(
            id,
            data,
        );

        if (!updatedEmployee) {
            throw new NotFoundException(
                `Employee with that id: ${id} not found`,
            );
        }
        return updatedEmployee;
    }
}