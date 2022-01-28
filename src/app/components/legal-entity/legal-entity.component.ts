import { LegalEntity } from './../../api/legal-entity.model';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LegalEntityService } from 'src/app/service/legal-entity.service';


@Component({
    templateUrl: './legal-entity.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class LegalEntityComponent implements OnInit {

    legalEntityDialog: boolean;

    deleteLegalEntityDialog: boolean = false;

    deleteLegalEntitiesDialog: boolean = false;

    legalEntities: LegalEntity[] = [];

    legalEntity: LegalEntity;

    selectedLegalEntities: LegalEntity[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];
    constructor(protected legalEntityService: LegalEntityService
        , private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.legalEntities.push(new LegalEntity(1, "1", null));

        this.cols = [
            { field: 'id', header: 'id' },
            { field: 'name', header: 'name' },
            { field: 'type', header: 'type' },
            { field: 'vehicles', header: 'vehicles' },
            { field: 'addresses', header: 'addresses' },


        ];


        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.legalEntity = {};
        this.submitted = false;
        this.legalEntityDialog = true;
    }

    deleteSelectedLegalEntities() {
        this.deleteLegalEntitiesDialog = true;
    }

    editLegalEntity(legalEntity: LegalEntity) {
        this.legalEntity = { ...legalEntity };
        this.legalEntityDialog = true;
    }

    deleteLegalEntity(legalEntity: LegalEntity) {
        this.deleteLegalEntityDialog = true;
        this.legalEntity = { ...legalEntity };
    }

    confirmDeleteSelected() {
        this.deleteLegalEntitiesDialog = false;
        this.legalEntities = this.legalEntities.filter(val => !this.selectedLegalEntities.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'LegalEntities Deleted', life: 3000 });
        this.selectedLegalEntities = null;
    }

    confirmDelete() {
        this.deleteLegalEntityDialog = false;
        this.legalEntities = this.legalEntities.filter(val => val.id !== this.legalEntity.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'LegalEntity Deleted', life: 3000 });
        this.legalEntity = {};
    }

    hideDialog() {
        this.legalEntityDialog = false;
        this.submitted = false;
    }

    saveLegalEntity() {
        this.submitted = true;

        if (this.legalEntity.name.trim()) {
            if (this.legalEntity.id) {
                // @ts-ignore
                this.legalEntity.inventoryStatus = this.legalEntity.inventoryStatus.value ? this.legalEntity.inventoryStatus.value : this.legalEntity.inventoryStatus;
                this.legalEntities[this.findIndexById(this.legalEntity.id)] = this.legalEntity;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'LegalEntity Updated', life: 3000 });
            } else {
                /*   this.legalEntity.id = this.createId();
                  this.legalEntity.code = this.createId();
                  this.legalEntity.image = 'legalEntity-placeholder.svg'; */
                // @ts-ignore
                //    this.legalEntity.inventoryStatus = this.legalEntity.inventoryStatus ? this.legalEntity.inventoryStatus.value : 'INSTOCK';
                this.legalEntities.push(this.legalEntity);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'LegalEntity Created', life: 3000 });
            }

            this.legalEntities = [...this.legalEntities];
            this.legalEntityDialog = false;
            this.legalEntity = {};
        }
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.legalEntities.length; i++) {
            if (this.legalEntities[i].id === id) {
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
