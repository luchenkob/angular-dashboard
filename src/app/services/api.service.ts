import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';
import { IFlow } from '../shared/interfaces/IFlow';
import { Observable, throwError } from 'rxjs';
import { IAccount, IAccountApp } from '../shared/interfaces/IAccount';
import { MatSnackBar } from '@angular/material/snack-bar';

enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
}

interface HttpResponse<T> {
    message?: string;
    data?: T;
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    tokenId?: string;

    constructor(private auth: AngularFireAuth, private http: HttpClient, private snackbar: MatSnackBar, private ngZone: NgZone) {}

    private async getHeaders(): Promise<Record<string, string>> {
        if (!this.tokenId) {
            const user = await this.auth.currentUser;
            this.tokenId = await (user ? user.getIdToken() : await new Promise((r) => this.auth.onIdTokenChanged((u) => r(u.getIdToken()))));
        }

        if (!this.tokenId) {
            // TODO: display this
            this.snackbar.open('You are not authorized', 'close', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
                panelClass: ['red-snackbar'],
            });
            return;
        }

        return {
            Authorization: `Bearer ${this.tokenId}`,
        };
    }

    private catchError({ error, message }): Observable<never> {
        const errors = error && error.message ? error.message : message;

        const msg = this.parseError(errors);

        if (errors && msg) {
            this.ngZone.run(() => {
                this.snackbar.open(`Error: ${msg[0][0].toUpperCase() + msg[0].slice(1)}`, 'close', {
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 3000,
                    panelClass: ['red-snackbar'],
                });
            });
        }

        return throwError(errors);
    }


    private parseError(errors): string {

        const msg = [];

        if (errors) {
            errors.forEach((message) => {
                msg.push(Object.values(message.constraints));
            });
        }

        return msg[0];
    }

    private mapResponse<T>({ message, data }: HttpResponse<T>): T {
        if (message) {
            this.ngZone.run(() => {
                this.snackbar.open(message, 'close', {
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                    duration: 3000,
                    panelClass: ['green-snackbar'],
                });
            });
        }

        return data;
    }

    private async request<T>(method: HttpMethod, url: string, body?: any): Promise<T> {
        switch (method) {
            case HttpMethod.GET: {
                return this.http
                    .get<HttpResponse<T>>(`${environment.baseUrl}/v1${url}`, { headers: await this.getHeaders() })
                    .pipe(map(this.mapResponse.bind(this)), catchError(this.catchError.bind(this)))
                    .toPromise();
            }
            case HttpMethod.POST: {
                return this.http
                    .post<HttpResponse<T>>(`${environment.baseUrl}/v1${url}`, body, { headers: await this.getHeaders() })
                    .pipe(map(this.mapResponse.bind(this)), catchError(this.catchError.bind(this)))
                    .toPromise();
            }
            case HttpMethod.PUT: {
                return this.http
                    .put<HttpResponse<T>>(`${environment.baseUrl}/v1${url}`, body, { headers: await this.getHeaders() })
                    .pipe(map(this.mapResponse.bind(this)), catchError(this.catchError.bind(this)))
                    .toPromise();
            }
            case HttpMethod.DELETE: {
                return this.http
                    .delete<HttpResponse<T>>(`${environment.baseUrl}/v1${url}`, { headers: await this.getHeaders() })
                    .pipe(map(this.mapResponse.bind(this)), catchError(this.catchError.bind(this)))
                    .toPromise();
            }
        }
    }

    /**
     * Returns all user's flows
     */
    getFlows(): Promise<IFlow[]> {
        return this.request(HttpMethod.GET, '/flow');
    }

    /**
     * Get all signal
     */
    getAllSignals(): Promise<any> {
        return this.request(HttpMethod.GET, '/flow/signals')
    }

    /**
     * Creates new flow
     */
    createFlow(data: IFlow): Promise<IFlow> {
        return this.request(HttpMethod.POST, '/flow', data);
    }

    /**
     * Updates a flow
     */
    updateFlow(id: string, data: IFlow): Promise<IFlow> {
        return this.request(HttpMethod.PUT, `/flow/${id}`, data);
    }

    /**
     * Deletes a flow
     */
    deleteFlow(id: string): Promise<IFlow> {
        return this.request(HttpMethod.DELETE, `/flow/${id}`);
    }

    /**
     * Returns a single flow
     */
    getFlow(id: string): Promise<IFlow> {
        return this.request(HttpMethod.GET, `/flow/${id}`);
    }

    /**
     * Returns user's account
     */
    getAccount(): Promise<IAccount> {
        return this.request(HttpMethod.GET, '/account');
    }

    /**
     * Updates user's account
     * deprecated
     */
    updateAccount(data: IAccount): Promise<IAccount> {
        return this.request(HttpMethod.PUT, '/account', data);
    }

    updateAccountApp(data: IAccountApp): Promise<IAccount> {
        delete data.baseUrl;
        delete data.editable;
        delete data['_id'];
        return this.request(HttpMethod.PUT, '/account/app', data);
    }
}
