import {RouteComponentProps} from "react-router";
import * as React from "react";

export class Exit extends React.Component<RouteComponentProps<{}>, {}> {
    constructor() {
        super();
        
    }
    
    deleteCookie() {
        this.setCookie("_user", "", {
            expires: -1
        })
    }

    setCookie(name: string, value: string, options: any) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }
    
    public render() {
        this.deleteCookie();

        this.props.history.push("/auth");

        location.reload();
        
        return <div>Exit...</div>;
    }
}