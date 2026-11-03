import { shipmentRepository } from "./shipment.repository";
import { shipmentInput, shipmentStatusInput } from "./shipment.schemas";
import { customerRepository } from "../customers/customer.repository";

export const shipmentService = {
  list: () => shipmentRepository.list(),
  async create(body: unknown) {
    const input = shipmentInput.parse(body);
    const customer = await customerRepository.findActive(input.customerId);
    if (!customer) return null;
    return shipmentRepository.create(input);
  },
  findById: (id: string) => shipmentRepository.findById(id),
  async updateStatus(id: string, body: unknown) {
    const { status } = shipmentStatusInput.parse(body);
    if (!(await shipmentRepository.findById(id))) return null;
    return shipmentRepository.updateStatus(id, status);
  },
};
