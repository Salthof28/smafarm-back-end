import { PartialType } from "@nestjs/mapped-types";
import { CreateDetailCareTransactioDto } from "./create-detail-care-transaction.dto";

export class UpdateDetailCareTransactioDto extends PartialType(CreateDetailCareTransactioDto) {}