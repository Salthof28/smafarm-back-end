import { PartialType } from "@nestjs/mapped-types";
import { CreateCareTransactionDto } from "./create-care-transaction.dto";


export class UpdateCareTransactionDto extends PartialType(CreateCareTransactionDto) {}