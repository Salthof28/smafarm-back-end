import { CareTransaction, DetailBuyTransaction, Transaction } from "@prisma/client";
import { Condition } from "src/global/entities/condition-entity";
import { CreateTransactionDto, TransactionDto } from "./dto/req/transaction.dto";
import { CreateCareTransactionDto } from "./dto/req/care-transaction.dto";
import { CreateDetailBuyDto } from "./dto/req/detail-buy.dto";
import { UpdateTransactionDto } from "./dto/req/update-transaction.dto";
import { UpdateDetailBuyDto } from "./dto/req/update-detail-buy.dto";
import { TransactionBodyDto } from "./dto/res/transaction-body.dto";
import { UpdateCareTransactionDto } from "./dto/req/update-care-transation.dto";
import { Decimal } from "@prisma/client/runtime/library";

export interface TransactionsServiceItf {
    getAllTransaction(query?: Condition): Promise<Transaction[]>;
    getAllTransactionBreeder(user_id: number): Promise<Transaction[]>
    getAllCareByShelter(shelter_id: number): Promise<CareTransaction[]>;
    getTransaction(id: number): Promise<Transaction>;
    transactionCare(transCare: TransactionCare): Promise<Transaction>;
    transactionBuy(transBuy: TransactionBuy): Promise<Transaction>;
    transactionBuyCare(transBuyCare: TransactionBuyCare): Promise<Transaction>;
    countCare(care: CreateCareTransactionDto[]): Promise<CreateCareTransactionDto[]>;
    countBuy(buy: CreateDetailBuyDto[]): Promise<CreateDetailBuyDto[]>;
    updateStatus(updated: UpdateTransaction): Promise<Transaction>;
    updatedBuy(updated: UpdateBuy): Promise<Transaction>;
    resheduleCare(updated: UpdateCare): Promise<Transaction>;
    countUpdateTransaction(count: UpdateCountTransaction): Promise<Decimal>;
    checkShelterAvaibility(careList: CreateCareTransactionDto[]): Promise<void>;
    dropTransaction(id: number): Promise<Transaction>;
    reviewTransaction(review: RatingService): Promise<Transaction>;
}


export interface RatingService {
    id_transaction: number,
    user_id: number
    // farm_id: number,
    rating: number,
    review?: string,
}
export interface TransactionCare {
    transaction: TransactionDto,
    care: CreateCareTransactionDto[],
}
export interface TransactionBuy {
    transaction: TransactionDto,
    buy: CreateDetailBuyDto[],  
}

export interface TransactionBuyCare {
    transaction: TransactionDto,
    buy: CreateDetailBuyDto[],  
    care: CreateCareTransactionDto[],
}

export interface UpdateTransaction {
    user_id: number,
    id: number,
    transaction: UpdateTransactionDto,
}

export interface UpdateBuy {
    user_id: number,
    id: number,
    buy: UpdateDetailBuyDto,
}
export interface UpdateCare {
    user_id: number,
    id: number,
    care: UpdateCareTransactionDto,
}

export interface UpdateCountTransaction {
    buy: DetailBuyTransaction[],  
    care: CareTransaction[],
}