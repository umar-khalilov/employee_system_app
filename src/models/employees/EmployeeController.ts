import { EmployeeEntity } from './EmployeeEntity';
import { EmployeeService } from './EmployeeService';
import { EmployeeDto } from './dtos/EmployeeDto';
import { IEmployee } from './interfaces/IEmployee';

export class EmployeeController implements IEmployee {
    private readonly employeeService: EmployeeService;

    constructor() {
        this.employeeService = new EmployeeService();
    }

    async createOneEmployee(data: EmployeeDto): Promise<EmployeeEntity> {
        return this.employeeService.createOneEmployee(data);
    }

    async findAllEmployees(): Promise<EmployeeEntity[]> {
        return this.employeeService.findAllEmployees();
    }

    async findOneEmployee(id: number): Promise<EmployeeEntity> {
        return this.employeeService.findOneEmployee(id);
    }

    async updateOneEmployee(
        id: number,
        data: EmployeeDto,
    ): Promise<EmployeeEntity> {
        return this.employeeService.updateOneEmployee(id, data);
    }

    async removeOneEmployee(id: number): Promise<boolean> {
        return this.employeeService.removeOneEmployee(id);
    }
}
