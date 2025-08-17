import { PartialType } from "@nestjs/mapped-types";
import { CreateDetailBuyDto } from "./detail-buy.dto";

export class UpdateDetailBuyDto extends PartialType(CreateDetailBuyDto) {}