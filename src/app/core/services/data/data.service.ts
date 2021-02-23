import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '@env/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtResponse } from '@app/models/JwtResponse';
import { YtResponse } from '@app/models/YtResponse';
import { CookieService } from 'ngx-cookie-service';
import { User } from "@app/models/User";
import { PageCount } from '@app/models/YtResponse';
import { AppSettings } from '@app/core/settings/index';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private currentUserSubject: BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
    constructor(private http: HttpClient,
        private cookieService: CookieService) {

    }

    getAllNozzles(page: number, size: number, filter: any): Observable<any> {
        const url = `${apiUrl}/tankApi/nozzles`;
        // let params = new HttpParams().set('filter', '{"name":"taf"}').set("sortd",'["lastUpdatedOn","DESC"]').set("sdfsd","sdfsd");  

        filter.isFreeSearch = true;
        filter.roleCode = "ROLE_ADMIN";
        filter = JSON.stringify(filter);

        let range: any = [page, PageCount.count];
        range = JSON.stringify(range);
        let params = new HttpParams().set("range", range).set('filter', filter);
        return this.http.get<any>(url, { params: params });
    }

    createNozzle(tank: any): Observable<YtResponse> {
        const url = `${apiUrl}/tankApi/nozzle/new`;
        return this.http.post<YtResponse>(url, tank);
    }

    getAllTanks(page: number, size: number, filter: any): Observable<any> {
        const url = `${apiUrl}/api/tanks`;
        // let params = new HttpParams().set('filter', '{"name":"taf"}').set("sortd",'["lastUpdatedOn","DESC"]').set("sdfsd","sdfsd");  

        filter.isFreeSearch = true;
        filter.roleCode = "ROLE_ADMIN";
        filter = JSON.stringify(filter);

        let range: any = [page, PageCount.count];
        range = JSON.stringify(range);
        let params = new HttpParams().set("range", range).set('filter', filter);
        return this.http.get<any>(url, { params: params });
    }

    getTank(uuid: string): Observable<YtResponse> {
        const url = `${apiUrl}/api/tank/${uuid}`;
        return this.http.get<YtResponse>(url);
    }

    createTank(tank: any): Observable<YtResponse> {
        const url = `${apiUrl}/api/tank/new`;
        return this.http.post<YtResponse>(url, tank);
    }

    getAllPumps(page: number, size: number, filter: any): Observable<any> {
        const url = `${apiUrl}/pumps`;
        // let params = new HttpParams().set('filter', '{"name":"taf"}').set("sortd",'["lastUpdatedOn","DESC"]').set("sdfsd","sdfsd");  

        filter.isFreeSearch = true;
        filter.roleCode = "ROLE_ADMIN";
        filter = JSON.stringify(filter);

        let range: any = [page, PageCount.count];
        range = JSON.stringify(range);
        let params = new HttpParams().set("range", range).set('filter', filter);
        return this.http.get<any>(url, { params: params });
    }

    getAllProducts(page: number, size: number, filter: any): Observable<any> {
        const url = `${apiUrl}/product/productinventory`;
        // let params = new HttpParams().set('filter', '{"name":"taf"}').set("sortd",'["lastUpdatedOn","DESC"]').set("sdfsd","sdfsd");  

        filter.isFreeSearch = true;
        filter.roleCode = "ROLE_ADMIN";
        filter = JSON.stringify(filter);

        let range: any = [page, PageCount.count];
        range = JSON.stringify(range);
        let params = new HttpParams().set("range", range).set('filter', filter);
        return this.http.get<any>(url, { params: params });
    }

    createPump(tank: any): Observable<YtResponse> {
        const url = `${apiUrl}/pump/new`;
        return this.http.post<YtResponse>(url, tank);
    }

    addPumpSaleEntry(tank: any): Observable<YtResponse> {
        const url = `${apiUrl}/pumpSaleApi/bulkSave`;
        return this.http.post<YtResponse>(url, tank);
    }

    getPumpSaleEntries(page: number, size: number, filter: any): Observable<any> {
        const url = `${apiUrl}/pumpSaleApi/getAll`;
        // let params = new HttpParams().set('filter', '{"name":"taf"}').set("sortd",'["lastUpdatedOn","DESC"]').set("sdfsd","sdfsd");  

        filter.isFreeSearch = true;
        filter.roleCode = "ROLE_ADMIN";
        filter = JSON.stringify(filter);

        let range: any = [page, PageCount.count];
        range = JSON.stringify(range);
        let params = new HttpParams().set("range", range).set('filter', filter);
        return this.http.get<any>(url, { params: params });
    }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error); // log to console instead 
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
