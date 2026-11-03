import { customerRepository } from "./customer.repository";
import { customerInput, customerUpdateInput } from "./customer.schemas";
import { z } from "zod";

export const customerService = {
  list: () => customerRepository.list(),
  async create(body: unknown) { return customerRepository.create(customerInput.parse(body)); },
  async update(id: string, body: unknown) {
    const input = customerUpdateInput.parse(body);
    if (!(await customerRepository.findActive(id))) return null;
    return customerRepository.update(id, input);
  },
  async softDelete(id: string) {
    if (!(await customerRepository.findActive(id))) return false;
    await customerRepository.softDelete(id); return true;
  },
  async findActive(id: string) { return customerRepository.findActive(z.string().min(1).parse(id)); },
};
