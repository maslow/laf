///////////////////////////////////////////////////////////////////////
//                                                                   //
// this file is autogenerated by service-generate                    //
// do not edit this file manually                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
/// <reference path = "api-auto.d.ts" />
import request from "@/utils/request";

/**
 * Get current user profile
 */
export async function AppControllerGetProfile(
  params: Paths.AppControllerGetProfile.BodyParameters,
  extra?: { [key: string]: any },
): Promise<Paths.AppControllerGetProfile.Responses> {
  return request("/v1/profile", {
    method: "GET",
    params: params,
    ...(extra || {}),
  });
}