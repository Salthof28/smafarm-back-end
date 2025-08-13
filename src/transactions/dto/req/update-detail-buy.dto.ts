import { PartialType } from "@nestjs/mapped-types";
import { CreateDetailBuyDto } from "./create-detail-buy.dto";

export class UpdateDetailBuyDto extends PartialType(CreateDetailBuyDto) {}