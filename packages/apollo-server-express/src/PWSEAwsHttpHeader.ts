import {IncomingHttpHeaders} from "http";

export class PWSEAwsHttpHeader {
  public contentLength: number;
  public apiId: string | undefined;
  public connectionId: string | undefined;
  public connectedAt: number;
  public requestId: string | undefined;
  public routeKey: string | undefined;
  public requestEpochTime: number;
  public domainName: string | undefined;
  public mappedDomainName: string | undefined;
  public identitySourceIp: string | undefined;
  public vpcLinkId: string | undefined;
  public stage: string | undefined;

  constructor(jsonObject: IncomingHttpHeaders) {
    this.contentLength = parseInt(PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["content-length"]) || '0');
    this.apiId = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-apiid"]);
    this.connectionId = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-connectionid"]);
    this.connectedAt = parseInt(PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-connectedat"]) || '0');
    this.routeKey = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-routekey"]);
    this.requestEpochTime = parseInt(PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-requestepochtime"]) || '0');
    this.domainName = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-stagevars-domainname"]);
    this.mappedDomainName = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-mapped-domainname"]);
    this.identitySourceIp = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-identity-sourceip"]);
    this.vpcLinkId = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-stagevars-vpclinkid"]);
    this.stage = PWSEAwsHttpHeader.getStringValueOrUndefined(jsonObject["pwse-stage"]);
  }

  private static getStringValueOrUndefined(val: string | string[] | undefined) {
    if(!val || typeof (val) === 'undefined') {
      return undefined;
    }
    let newVal = String(val);
    if(newVal.length <= 0) {
      return undefined;
    }
    return newVal;
  }

  public isValid() {
    if(this.apiId === undefined ||
      this.domainName === undefined ||
      this.stage === undefined ||
      this.connectionId === undefined) {
      return false;
    }
    return true
  }
}
