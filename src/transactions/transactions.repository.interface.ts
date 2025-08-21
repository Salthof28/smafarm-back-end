import { Condition } from "src/global/entities/condition-entity";
import { TransactionDto } from "./dto/req/transaction.dto";
import { UpdateTransactionDto } from "./dto/req/update-transaction.dto";
import { CreateCareTransactionDto } from "./dto/req/care-transaction.dto";
import { UpdateCareTransactionDto } from "./dto/req/update-care-transation.dto";
import { CreateDetailBuyDto } from "./dto/req/detail-buy.dto";
import { UpdateDetailBuyDto } from "./dto/req/update-detail-buy.dto";
import { CareTransaction, DetailBuyTransaction, DetailCareTransaction, Transaction } from "@prisma/client";

export interface TransactionsRepositoryItf {
    getAll(query?: Condition): Promise<Transaction[] | undefined>;
    getAllCareByShelter(shelter_id: number): Promise<CareTransaction[]>;
    getAllCare(transaction_id?: number, booking?: AllCareBooking): Promise<CareTransaction[] | undefined>;
    getAllbooking(booking: AllBooking[]): Promise<OutAllBooking[]>
    getOne(id: number): Promise<OutFarmIdTransaction | undefined>;
    getOneBuy(id: number): Promise<OutAccessBuy | undefined>;
    getOneCare(id: number): Promise<OutAccessCare | undefined>;
    createdCareTransaction(careTransaction: CreateTransactionCare): Promise<Transaction>;
    updatedTransaction(upTrans: UpdateTransaction): Promise<Transaction>;
    createdBuyTransaction(create: CreateTransactionBuy): Promise<Transaction>;
    updatedCareTransaction(careTrans: UpdateCareTransaction): Promise<CareTransaction>;
    createdBuyCareTransaction(create: CreateBuyCareTransaction): Promise<Transaction>;
    updatedDetailBuy(upBuy: UpdateDetailBuy): Promise<DetailBuyTransaction>;
}

export interface AllCareBooking {
    shelter_id: number, 
    start: Date, 
    finish: Date
}

export interface AllBooking {
    shelter_id: number, 
    start_date: { lte: Date },
    finish_date: { gte: Date },
}
export interface UpdateTransaction {
    id: number,
    body: UpdateTransactionDto
}
export interface CreateTransactionCare {
    transaction: TransactionDto,
    care: CreateCareTransactionDto[],
}

export interface UpdateCareTransaction {
    id: number,
    body: UpdateCareTransactionDto
}
export interface CreateBuyCareTransaction {
    transaction: TransactionDto,
    care: CreateCareTransactionDto[],
    buy: CreateDetailBuyDto[],  
}
export interface UpdateDetailBuy {
    id: number,
    body: UpdateDetailBuyDto
}
export interface CreateTransactionBuy {
    transaction: TransactionDto,
    buy: CreateDetailBuyDto[],   
}

export type OutFarmIdTransaction = (Transaction & { 
    detail_buy: DetailBuyTransaction[],
    care_transaction: CareTransaction[],
    farm: { 
        user_id: number 
    } 
}); 
export type OutAccessBuy =  (DetailBuyTransaction & {
    transaction_id,
    transaction: { 
        customer_id: number,
        farm: {
            user_id: number 
        },
        status_transaction: string
    }
});

export type OutAccessCare =  (CareTransaction & {
    // transaction_id,
    transaction: { 
        customer_id: number,
        farm: 
        { user_id: 
            number 
        },
        status_transaction: string
    },
    shelter: {
        accomodate: number
    }
})

export type OutAllBooking = {
    shelter_id: number,
    total_livestock: number
}