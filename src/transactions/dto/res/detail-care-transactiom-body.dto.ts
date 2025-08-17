import { Expose, Type } from "class-transformer";
import { CareBodyDto } from "src/shelters/dto/res/care-body.dto";

export class DetailCareTransactionBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    careTransaction_id: number;
    @Expose()
    @Type(() => Number)
    careGive_id: number;
    @Expose()
    @Type(() => CareBodyDto)
    careGive: CareBodyDto;
}