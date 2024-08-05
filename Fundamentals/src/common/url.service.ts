import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UrlService {
    constructor(@Inject(REQUEST) private readonly request: Request) {}

    getBaseUrl(): string {
        const protocol = this.request.protocol;
        const host = this.request.get('host');
        return `${protocol}://${host}`;
    }

    to(path: string): string {
        return `${this.getBaseUrl()}${path}`;
    }
}