

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Make } from 'src/app/api/make.model';
import { MakeService } from 'src/app/service/make.service';



@Component({
    templateUrl: './make.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class MakeComponent implements OnInit {

    makeDialog: boolean;

    deleteMakeDialog: boolean = false;

    deleteMakesDialog: boolean = false;

    makes: Make[] = [];

    make: Make;

    selectedMakes: Make[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private makeService: MakeService, private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.makes.push(new Make(1, "toyota"));

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'label', header: 'label' },

        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.make = {};
        this.submitted = false;
        this.makeDialog = true;
    }

    deleteSelectedMakes() {
        this.deleteMakesDialog = true;
    }

    editMake(make: Make) {
        this.make = { ...make };
        this.makeDialog = true;
    }

    deleteMake(make: Make) {
        this.deleteMakeDialog = true;
        this.make = { ...make };
    }

    confirmDeleteSelected() {
        this.deleteMakesDialog = false;
        this.makes = this.makes.filter(val => !this.selectedMakes.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Makes Deleted', life: 3000 });
        this.selectedMakes = null;
    }

    confirmDelete() {
        this.deleteMakeDialog = false;
        this.makes = this.makes.filter(val => val.id !== this.make.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Make Deleted', life: 3000 });
        this.make = {};
    }

    hideDialog() {
        this.makeDialog = false;
        this.submitted = false;
    }

    saveMake() {
        this.submitted = true;

        if (this.make.label.trim()) {
            if (this.make.id) {
                // @ts-ignore
                this.make.inventoryStatus = this.make.inventoryStatus.value ? this.make.inventoryStatus.value : this.make.inventoryStatus;
                this.makes[this.findIndexById(this.make.id)] = this.make;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Make Updated', life: 3000 });
            } else {
                /* this.make.id= this.createId();
                this.make.code = this.createId();
                this.make.image = 'make-placeholder.svg'; */
                // @ts-ignore
                //  this.make.inventoryStatus = this.make.inventoryStatus ? this.make.inventoryStatus.value : 'INSTOCK';
                this.makes.push(this.make);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Make Created', life: 3000 });
            }

            this.makes = [...this.makes];
            this.makeDialog = false;
            this.make = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.makes.length; i++) {
            if (this.makes[i].id === id) {
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
