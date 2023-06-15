import { IncomingMessage } from 'node:http';
import { URL } from 'node:url';
import { Paths } from '../enums/Paths';
import { HttpMethods } from '../enums/HttpMethods';

const getReqData = (req: IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getQueryParams = (
    req: IncomingMessage,
): { pathname: string; searchParams: URLSearchParams } => {
    const currentUrl = new URL(req.url, 'http://localhost:4000');
    const pathname = currentUrl.pathname;
    const searchParams = currentUrl.searchParams;
    return { pathname, searchParams };
};

const conditions = {
    isHome: (req: IncomingMessage, pathname: string) => {
        return pathname === Paths.HOME && req.method === HttpMethods.GET;
    },
    isSignUp: (req: IncomingMessage, pathname: string) => {
        return pathname === Paths.SIGN_UP && req.method === HttpMethods.POST;
    },
    isSignIn: (req: IncomingMessage, pathname: string) => {
        return pathname === Paths.SIGN_IN && req.method === HttpMethods.POST;
    },
    isGetAll: (
        req: IncomingMessage,
        pathname: string,
        searchParams: URLSearchParams,
    ) => {
        return (
            (pathname === Paths.EMPLOYEES && req.method === HttpMethods.GET) ||
            searchParams.has('department') ||
            searchParams.has('subdepartment') ||
            searchParams.has('on-contract')
        );
    },
    isGet: (req: IncomingMessage, pathname: string) => {
        return (
            pathname.match(/\/api\/employees\/([0-9]+)/) &&
            req.method === HttpMethods.GET
        );
    },
    isUpdate: (req: IncomingMessage, pathname: string) => {
        return (
            pathname.match(/\/api\/employees\/([0-9]+)/) &&
            req.method === HttpMethods.PUT
        );
    },
    isDelete: (req: IncomingMessage, pathname: string) => {
        return (
            pathname.match(/\/api\/employees\/([0-9]+)/) &&
            req.method === HttpMethods.DELETE
        );
    },
};

export { getReqData, getQueryParams, conditions };
