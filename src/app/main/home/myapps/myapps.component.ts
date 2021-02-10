import { Component, OnInit } from '@angular/core';
import { IAccount, IAccountApp } from 'app/shared/interfaces/IAccount';
import { AccountService } from '../../../services/account.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@UntilDestroy()
@Component({
    selector: 'app-myapps',
    templateUrl: './myapps.component.html',
    styleUrls: ['./myapps.component.scss'],
})
export class MyappsComponent implements OnInit {
    account: IAccount;
    isSuccessResponse: boolean;
    isErrorResponse: boolean;

    typeOptions = [
        { label: 'Paper', value: 'paper' },
        { label: 'Live', value: 'live' },
    ];

    constructor(private accountService: AccountService) {
        this.accountService.account$.pipe(untilDestroyed(this)).subscribe((acc) => {
            this.account = acc;
        });
    }

    ngOnInit(): void {
        this.clearResponse();
        this.accountService.fetchAccount();
    }

    onClickReset(appId: number): void {
        this.clearResponse();
        if (window.confirm('Reset app? Current data will be lost.')) {
            this.account.apps[appId].editable = true;
            this.account.apps[appId].type = '';
            this.account.apps[appId].key = '';
            this.account.apps[appId].secret = '';
        }
    }

    save(appId: number): Promise<void> {
        this.clearResponse();
        this.account.apps[appId].editable = false;
        this.account.apps.forEach((app) => {
            delete app.editable;
            delete app.baseUrl;
        });
        return this.accountService.updateAccountApp(this.account.apps[0])
            .then(response => {
                this.isSuccessResponse = true;
            })
            .catch(err => {
                this.isErrorResponse = true;
            })
        
    }

    clearResponse(): void{
        this.isErrorResponse = false;
        this.isSuccessResponse = false;
    }
}
