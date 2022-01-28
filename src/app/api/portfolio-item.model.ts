
import * as dayjs from 'dayjs';
import { IPortfolioItemStatusEntry } from './portfolio-item-status-entry.model';
import { IPortfolio } from './portfolio.model';
import { IVehicle } from './vehicle.model';


export interface IPortfolioItem {
    id?: number;
    vehicle?: IVehicle | null;
    portfolio?: IPortfolio | null;
    stockEntranceDate?: dayjs.Dayjs;
    statusEntries?: IPortfolioItemStatusEntry[];
}

export class PortfolioItem implements IPortfolioItem {
    constructor(
        public id?: number,
        public vehicle?: IVehicle | null,
        public portfolio?: IPortfolio | null,
        public stockEntranceDate?: dayjs.Dayjs,
        public statusEntries?: IPortfolioItemStatusEntry[],
    ) { }
}

export function getPortfolioItemIdentifier(portfolioItem: IPortfolioItem): number | undefined {
    return portfolioItem.id;
}
