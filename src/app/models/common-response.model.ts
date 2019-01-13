
export class CommonResponseModel<T> {
  constructor(public code: string,
              public message: string,
              public success: boolean,
              public tipLevel: string,
              public data: T) {}
}
