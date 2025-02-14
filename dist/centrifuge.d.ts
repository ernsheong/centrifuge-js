// Type definitions for centrifuge 2.*.*
// Project: https://github.com/centrifugal/centrifuge-js
// Definitions by: Jekaspekas <https://github.com/jekaspekas>
// TypeScript Version: 3.4.5

export = Centrifuge;

// From https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/globals.d.ts
declare class EventEmitter {
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    off(event: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...args: any[]): boolean;
    listenerCount(type: string | symbol): number;
    // Added in Node 6...
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    eventNames(): Array<string | symbol>;
}

declare class Centrifuge extends EventEmitter {
    constructor(url: string, options?: Centrifuge.Options);
    setToken(token: string): void;
    setConnectData(data: any): void;
    rpc(data: any): Promise<any>;
    send(data: any): Promise<any>;
    publish(channel: string, data: any): Promise<any>;
    getSub(channel: string): Centrifuge.Subscription;
    isConnected(): boolean;
    connect(): void;
    disconnect(): void;
    ping(): void;
    startBatching(): void;
    stopBatching(): void;
    startSubscribeBatching(): void;
    stopSubscribeBatching(): void;
    subscribe(channel: string, events?: (...args: any[]) => void): Centrifuge.Subscription;
    subscribe(channel: string, events?: Centrifuge.SubscriptionEvents): Centrifuge.Subscription;
}

declare namespace Centrifuge {

    export interface Options {
        debug?: boolean;
        websocket?: any;
        sockjs?: any;
        promise?: any;
        minRetry?: number;
        maxRetry?: number;
        timeout?: number;
        ping?: boolean;
        pingInterval?: number;
        pongWaitTimeout?: number;
        privateChannelPrefix?: string;
        onTransportClose?: (ctx: object) => void;
        sockjsServer?: string;
        sockjsTransports?: string[];
        refreshEndpoint?: string;
        refreshHeaders?: object;
        refreshParams?: object;
        refreshData?: object;
        refreshAttempts?: number;
        refreshInterval?: number;
        onRefreshFailed?: () => void;
        onRefresh?: (ctx: object, cb: (resp: RefreshResponse) => void) => void;
        subscribeEndpoint?: string;
        subscribeHeaders?: object;
        subscribeParams?: object;
        subRefreshInterval?: number;
        onPrivateSubscribe?: (ctx: SubscribePrivateContext, cb: (resp: SubscribePrivateResponse) => void) => void;
    }

    export class Subscription extends EventEmitter {
        channel: string;
        ready(callback: (ctx: SubscribeSuccessContext) => void, errback: (ctx: SubscribeErrorContext) => void): void;
        subscribe(): void;
        unsubscribe(): void;
        publish(data: any): Promise<any>;
        presence(): Promise<PresenceResult>;
        presenceStats(): Promise<PresenceStatsResult>;
        history(): Promise<HistoryResult>;
    }

    export interface SubscriptionEvents {
        publish?: (ctx: PublicationContext) => void;
        join?: (ctx: JoinLeaveContext) => void;
        leave?: (ctx: JoinLeaveContext) => void;
        subscribe?: (ctx: SubscribeSuccessContext) => void;
        error?: (ctx: SubscribeErrorContext) => void;
        unsubscribe?: (ctx: UnsubscribeContext) => void;
    }

    export interface PublicationContext {
        data: any;
        info?: ClientInfo;
        seq?: number;
        gen?: number;
    }

    export interface ClientInfo {
        user? : string;
        client? : string;
        conn_info?: any;
        chan_info?: any;
    }

    export interface JoinLeaveContext {
        info: ClientInfo;
    }

    export interface SubscribeSuccessContext {
        channel: string;
        isResubscribe: boolean;
        recovered: boolean;
    }

    export interface SubscribeErrorContext {
        error: string;
        channel: string;
        isResubscribe: boolean;
    }

    export interface UnsubscribeContext {
        channel: string;
    }
  
    export interface SubscribePrivateContext {
        data: SubscribePrivateData;
    }

    export interface SubscribePrivateData {
        client: string;
        channels: string[];
    }

    export interface RefreshResponse {
        status: number;
        data: RefreshTokenData;
    }

    export interface RefreshTokenData {
        token: string;
    }

    export interface SubscribePrivateResponse {
        status: number;
        channels: PrivateChannelData[];
    }

    export interface PrivateChannelData {
        channel: string;
        token: string;
    }

    export interface PresenceResult {
        presence: PresenceMap;
    }

    export interface PresenceMap {
        [key: string]: ClientInfo;
    }

    export interface PresenceStatsResult {
        num_clients: number;
        num_users: number;
    }

    export interface HistoryResult {
        publications: PublicationContext[];
    }
}
