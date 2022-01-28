import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Country } from 'src/app/api/country.model';
import { CountryService } from 'src/app/service/countryservice';


@Component({
    templateUrl: './country.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class CountryComponent implements OnInit {

    countryDialog: boolean;

    deleteCountryDialog: boolean = false;

    deleteCountriesDialog: boolean = false;

    countries: Country[] = [];

    country: Country;

    selectedCountries: Country[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    constructor(protected countryServices: CountryService
        , private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.countries.push(new Country(1, "1", "null"));

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'name', header: 'name' },
            { field: 'code', header: 'code' },


        ];


        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }
    openNew() {
        this.country = {};
        this.submitted = false;
        this.countryDialog = true;
    }

    deleteSelectedCountrys() {
        this.deleteCountriesDialog = true;
    }

    editCountry(country: Country) {
        this.country = { ...country };
        this.countryDialog = true;
    }

    deleteCountry(country: Country) {
        this.deleteCountryDialog = true;
        this.country = { ...country };
    }

    confirmDeleteSelected() {
        this.deleteCountriesDialog = false;
        this.countries = this.countries.filter(val => !this.selectedCountries.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Countrys Deleted', life: 3000 });
        this.selectedCountries = null;
    }

    confirmDelete() {
        this.deleteCountryDialog = false;
        this.countries = this.countries.filter(val => val.id !== this.country.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Country Deleted', life: 3000 });
        this.country = {};
    }

    hideDialog() {
        this.countryDialog = false;
        this.submitted = false;
    }

    saveCountry() {
        this.submitted = true;

        if (this.country.name.trim()) {
            if (this.country.id) {
                // @ts-ignore
                this.country.inventoryStatus = this.country.inventoryStatus.value ? this.country.inventoryStatus.value : this.country.inventoryStatus;
                this.countries[this.findIndexById(this.country.id)] = this.country;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Country Updated', life: 3000 });
            } else {
                /*    this.country.id = this.createId();
                   this.country.code = this.createId();
                   this.country.image = 'country-placeholder.svg'; */
                // @ts-ignore
                //    this.country.inventoryStatus = this.country.inventoryStatus ? this.country.inventoryStatus.value : 'INSTOCK';
                this.countries.push(this.country);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Country Created', life: 3000 });
            }

            this.countries = [...this.countries];
            this.countryDialog = false;
            this.country = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.countries.length; i++) {
            if (this.countries[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

}
