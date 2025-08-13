import { Condition } from "src/global/entities/condition-entity";
import { CreateTransactionDto } from "./dto/req/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/req/update-transaction.dto";
import { CreateCareTransactionDto } from "./dto/req/create-care-transaction.dto";
import { UpdateCareTransactionDto } from "./dto/req/update-care-transation.dto";
import { CreateDetailCareTransactioDto } from "./dto/req/create-detail-care-transaction.dto";
import { CreateDetailBuyDto } from "./dto/req/create-detail-buy.dto";
import { UpdateDetailCareTransactioDto } from "./dto/req/update-detail-care-transaction.dto";
import { UpdateDetailBuyDto } from "./dto/req/update-detail-buy.dto";
import { CareTransaction, DetailBuyTransaction, DetailCareTransaction, Transaction } from "@prisma/client";

export interface TransactionsRepositoryItf {
    getAll(query?: Condition): Promise<Transaction[] | undefined>;
    getOne(id: number): Promise<Transaction | undefined>;
    createdTransaction(body: CreateTransactionDto): Promise<Transaction>;
    updatedTransaction(upTrans: UpdateTransaction): Promise<Transaction>;
    createdCareTransaction(body: CreateCareTransactionDto): Promise<CareTransaction>;
    updatedCareTransaction(careTrans: UpdateCareTransaction): Promise<CareTransaction>;
    createdDetailCare(body: CreateDetailCareTransactioDto): Promise<DetailCareTransaction>;
    updatedDetailCare(detailCare: UpdateDetailCare): Promise<DetailCareTransaction>;
    createdDetailBuy(body: CreateDetailBuyDto): Promise<DetailBuyTransaction>;
    updatedDetailBuy(upBuy: UpdateDetailBuy): Promise<DetailBuyTransaction>;
}

export interface UpdateTransaction {
    id: number,
    body: UpdateTransactionDto
}
export interface UpdateCareTransaction {
    id: number,
    body: UpdateCareTransactionDto
}
export interface UpdateDetailCare {
    id: number,
    body: UpdateDetailCareTransactioDto
}
export interface UpdateDetailBuy {
    id: number,
    body: UpdateDetailBuyDto
}