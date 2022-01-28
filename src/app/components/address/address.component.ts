import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Address } from 'src/app/api/address.model';
import { AddressService } from 'src/app/service/address.service';

@Component({
    templateUrl: './address.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class AddressComponent implements OnInit {


    addressDialog: boolean;

    deleteAddressDialog: boolean = false;

    deleteAddressesDialog: boolean = false;

    addresses: Address[] = [];

    address: Address;

    selectedAddresses: Address[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];


    constructor(protected addressService: AddressService
        , private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.addresses.push(new Address(1, "1", "null", "true", "123", "km", true, null, null));

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'label', header: 'label' },
            { field: 'postCode', header: 'postCode' },
            { field: 'addressLine1', header: 'addressLine1' },
            { field: 'addressLine1', header: 'addressLine2' },
            { field: 'city', header: 'city' },
            { field: 'main', header: 'main' },
            { field: 'country', header: 'country' },
            { field: 'legalEntity', header: 'legalEntity' }

        ];


        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.address = {};
        this.submitted = false;
        this.addressDialog = true;
    }

    deleteSelectedAddresses() {
        this.deleteAddressesDialog = true;
    }

    editAddress(address: Address) {
        this.address = { ...address };
        this.addressDialog = true;
    }

    deleteAddress(address: Address) {
        this.deleteAddressDialog = true;
        this.address = { ...address };
    }

    confirmDeleteSelected() {
        this.deleteAddressesDialog = false;
        this.addresses = this.addresses.filter(val => !this.selectedAddresses.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Addresses Deleted', life: 3000 });
        this.selectedAddresses = null;
    }

    confirmDelete() {
        this.deleteAddressDialog = false;
        this.addresses = this.addresses.filter(val => val.id !== this.address.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Address Deleted', life: 3000 });
        this.address = {};
    }

    hideDialog() {
        this.addressDialog = false;
        this.submitted = false;
    }

    saveAddress() {
        this.submitted = true;

        if (this.address.label.trim()) {
            if (this.address.id) {
                // @ts-ignore
                this.address.inventoryStatus = this.address.inventoryStatus.value ? this.address.inventoryStatus.value : this.address.inventoryStatus;
                this.addresses[this.findIndexById(this.address.id)] = this.address;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Address Updated', life: 3000 });
            } else {
                /*     this.address.id = this.createId();
                    this.address.code = this.createId();
                    this.address.image = 'address-placeholder.svg'; */
                // @ts-ignore
                //  this.address.inventoryStatus = this.address.inventoryStatus ? this.address.inventoryStatus.value : 'INSTOCK';
                this.addresss.push(this.address);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Address Created', life: 3000 });
            }

            this.addresses = [...this.addresses];
            this.addressDialog = false;
            this.address = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.addresses.length; i++) {
            if (this.addresses[i].id === id) {
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
