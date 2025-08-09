import { Injectable } from "@nestjs/common";
import { FarmsRepositoryItf } from "./farms.repository.interface";

@Injectable()
export class FarmsRepository implements FarmsRepositoryItf {

}