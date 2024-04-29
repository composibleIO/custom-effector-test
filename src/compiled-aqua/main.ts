/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.13.0
 * @fluencelabs/aqua-to-js version: 0.3.5
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, ParticleContext as ParticleContext$$ } from '@fluencelabs/js-client';

// Making aliases to reduce chance of accidental name collision
import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$
} from '@fluencelabs/js-client';


// Functions
export const test_script = `
(xor
 (new $results-0
  (new $results
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "pinataJWTKey") [] -pinataJWTKey-arg-)
         )
         (par
          (seq
           (seq
            (seq
             (seq
              (seq
               (seq
                (new $option-inline
                 (seq
                  (seq
                   (new %MyDeployment_obj_map
                    (seq
                     (seq
                      (seq
                       (seq
                        (seq
                         (ap ("chainNetworkId" 31337) %MyDeployment_obj_map)
                         (ap ("dealId" "ce85503de9399d4deca3c0b2bb3e9e7cfcbf9c6b") %MyDeployment_obj_map)
                        )
                        (ap ("dealIdOriginal" "0xCe85503De9399D4dECa3c0b2bb3e9e7CFCBf9C6B") %MyDeployment_obj_map)
                       )
                       (ap ("definition" "bafkreichfxxt4z5qmcykvmjrqpsqrrpl77msr2hnhagnpfqnjeavrdv7gq") %MyDeployment_obj_map)
                      )
                      (ap ("timestamp" "2024-04-29T10:39:46.439Z") %MyDeployment_obj_map)
                     )
                     (canon %init_peer_id% %MyDeployment_obj_map  MyDeployment_obj)
                    )
                   )
                   (xor
                    (ap MyDeployment_obj $option-inline)
                    (null)
                   )
                  )
                  (canon %init_peer_id% $option-inline  #option-inline-0)
                 )
                )
                (new %Deals_obj_map
                 (seq
                  (ap ("myDeployment" #option-inline-0) %Deals_obj_map)
                  (canon %init_peer_id% %Deals_obj_map  Deals_obj)
                 )
                )
               )
               (ap Deals_obj.$.myDeployment Deals_obj_flat)
              )
              (ap Deals_obj_flat.$.[0].dealIdOriginal Deals_obj_flat_flat)
             )
             (xor
              (seq
               (seq
                (call -relay- ("subnet" "resolve") [Deals_obj_flat_flat] ret)
                (new -if-error-
                 (xor
                  (seq
                   (match ret.$.success false
                    (seq
                     (new $array-inline
                      (seq
                       (seq
                        (ap "Failed to resolve subnet: " $array-inline)
                        (ap ret.$.error $array-inline)
                       )
                       (canon -relay- $array-inline  #array-inline-0)
                      )
                     )
                     (call -relay- ("run-console" "print") [#array-inline-0])
                    )
                   )
                   (new $-hop-
                    (new #-hopc-
                     (canon -relay- $-hop-  #-hopc-)
                    )
                   )
                  )
                  (seq
                   (seq
                    (ap :error: -if-error-)
                    (xor
                     (seq
                      (match :error:.$.error_code 10001
                       (null)
                      )
                      (new $-hop-
                       (new #-hopc-
                        (canon -relay- $-hop-  #-hopc-)
                       )
                      )
                     )
                     (fail -if-error-)
                    )
                   )
                   (new $-hop-
                    (new #-hopc-
                     (canon -relay- $-hop-  #-hopc-)
                    )
                   )
                  )
                 )
                )
               )
               (ap ret.$.workers $results-0)
              )
              (fail :error:)
             )
            )
            (new $results-0_test
             (seq
              (seq
               (fold $results-0 results-0_fold_var
                (seq
                 (seq
                  (ap results-0_fold_var $results-0_test)
                  (canon %init_peer_id% $results-0_test  #results-0_iter_canon)
                 )
                 (xor
                  (match #results-0_iter_canon.length 1
                   (null)
                  )
                  (next results-0_fold_var)
                 )
                )
                (never)
               )
               (canon %init_peer_id% $results-0_test  #results-0_result_canon)
              )
              (ap #results-0_result_canon results-0_gate)
             )
            )
           )
           (fold results-0_gate.$.[0] w-0
            (par
             (xor
              (seq
               (seq
                (seq
                 (seq
                  (seq
                   (seq
                    (seq
                     (seq
                      (seq
                       (new $-hop-
                        (new #-hopc-
                         (canon -relay- $-hop-  #-hopc-)
                        )
                       )
                       (new $-hop-
                        (new #-hopc-
                         (canon w-0.$.host_id $-hop-  #-hopc-)
                        )
                       )
                      )
                      (call w-0.$.worker_id.[0] ("cioKubo" "getRecursive") ["/dns4/ipfs/tcp/5001" "QmWvw4aXTWJJMMmxWA95wZrNPvugRfQMMrgkvbfkeuQnNS" "test"] ret-0)
                     )
                     (call w-0.$.worker_id.[0] ("cioVault" "inspect") ["test"] ret-1)
                    )
                    (fold ret-1 f-0
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (new $-hop-
                           (new #-hopc-
                            (canon w-0.$.host_id $-hop-  #-hopc-)
                           )
                          )
                          (new $-hop-
                           (new #-hopc-
                            (canon -relay- $-hop-  #-hopc-)
                           )
                          )
                         )
                         (call %init_peer_id% ("run-console" "print") [f-0])
                        )
                        (new $-hop-
                         (new #-hopc-
                          (canon -relay- $-hop-  #-hopc-)
                         )
                        )
                       )
                       (new $-hop-
                        (new #-hopc-
                         (canon w-0.$.host_id $-hop-  #-hopc-)
                        )
                       )
                      )
                      (next f-0)
                     )
                     (null)
                    )
                   )
                   (call w-0.$.worker_id.[0] ("cioPinata" "addFolder") ["test" -pinataJWTKey-arg-] ret-2)
                  )
                  (ap ret-2 $results)
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon w-0.$.host_id $-hop-  #-hopc-)
                  )
                 )
                )
                (new $-hop-
                 (new #-hopc-
                  (canon -relay- $-hop-  #-hopc-)
                 )
                )
               )
               (new $-hop-
                (new #-hopc-
                 (canon %init_peer_id% $-hop-  #-hopc-)
                )
               )
              )
              (seq
               (seq
                (seq
                 (new $-hop-
                  (new #-hopc-
                   (canon w-0.$.host_id $-hop-  #-hopc-)
                  )
                 )
                 (new $-hop-
                  (new #-hopc-
                   (canon -relay- $-hop-  #-hopc-)
                  )
                 )
                )
                (new $-hop-
                 (new #-hopc-
                  (canon %init_peer_id% $-hop-  #-hopc-)
                 )
                )
               )
               (fail :error:)
              )
             )
             (next w-0)
            )
            (never)
           )
          )
          (null)
         )
        )
        (new $results_test
         (seq
          (seq
           (fold $results results_fold_var
            (seq
             (seq
              (ap results_fold_var $results_test)
              (canon %init_peer_id% $results_test  #results_iter_canon)
             )
             (xor
              (match #results_iter_canon.length 1
               (null)
              )
              (next results_fold_var)
             )
            )
            (never)
           )
           (canon %init_peer_id% $results_test  #results_result_canon)
          )
          (ap #results_result_canon results_gate)
         )
        )
       )
       (new $results_test-0
        (seq
         (seq
          (fold $results results_fold_var-0
           (seq
            (seq
             (ap results_fold_var-0 $results_test-0)
             (canon %init_peer_id% $results_test-0  #results_iter_canon-0)
            )
            (xor
             (match #results_iter_canon-0.length 1
              (null)
             )
             (next results_fold_var-0)
            )
           )
           (never)
          )
          (canon %init_peer_id% $results_test-0  #results_result_canon-0)
         )
         (ap #results_result_canon-0 results_gate-0)
        )
       )
      )
      (new -if-error-
       (xor
        (match results_gate-0.$.[0].result "QmWvw4aXTWJJMMmxWA95wZrNPvugRfQMMrgkvbfkeuQnNS"
         (call %init_peer_id% ("run-console" "print") ["our test is succesful!"])
        )
        (seq
         (ap :error: -if-error-)
         (xor
          (match :error:.$.error_code 10001
           (null)
          )
          (fail -if-error-)
         )
        )
       )
      )
     )
     (new $results_test-1
      (seq
       (seq
        (fold $results results_fold_var-1
         (seq
          (seq
           (ap results_fold_var-1 $results_test-1)
           (canon %init_peer_id% $results_test-1  #results_iter_canon-1)
          )
          (xor
           (match #results_iter_canon-1.length 1
            (null)
           )
           (next results_fold_var-1)
          )
         )
         (never)
        )
        (canon %init_peer_id% $results_test-1  #results_result_canon-1)
       )
       (ap #results_result_canon-1 results_gate-1)
      )
     )
    )
    (call %init_peer_id% ("callbackSrv" "response") [results_gate-1.$.[0]])
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export type TestResultType = { success: boolean; result: string; host_id: string; timestamp: number; result_raw: string; }

export type TestParams = [pinataJWTKey: string, config?: {ttl?: number}] | [peer: IFluenceClient$$, pinataJWTKey: string, config?: {ttl?: number}];

export type TestResult = Promise<TestResultType>;

export function test(...args: TestParams): TestResult {
    return callFunction$$(
        args,
        {
    "functionName": "test",
    "arrow": {
        "domain": {
            "fields": {
                "pinataJWTKey": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "AMResponse",
                    "fields": {
                        "success": {
                            "name": "bool",
                            "tag": "scalar"
                        },
                        "result": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "host_id": {
                            "name": "string",
                            "tag": "scalar"
                        },
                        "timestamp": {
                            "name": "i64",
                            "tag": "scalar"
                        },
                        "result_raw": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "struct"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        test_script
    );
}
