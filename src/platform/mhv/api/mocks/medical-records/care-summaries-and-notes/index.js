const all = {
  id: '5177513c-0db5-4c07-8b5f-05f57e00c044',
  meta: {
    lastUpdated: '2024-07-01T16:06:49.182-04:00',
  },
  type: 'searchset',
  total: 4,
  link: [
    {
      relation: 'self',
      url:
        'https://mhv-sysb-api.myhealth.va.gov/fhir/DocumentReference?_count=9999&patient=974&status%3Anot=entered-in-error&type=11506-3%2C18842-5%2C11488-4',
    },
  ],
  entry: [
    {
      fullUrl:
        'https://mhv-sysb-api.myhealth.va.gov/fhir/DocumentReference/1000',
      resource: {
        id: '1000',
        meta: {
          versionId: '2',
          lastUpdated: '2024-05-03T12:05:25.407-04:00',
          source: '#YJJUQxzI9g1Bx8zi',
          profile: [
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.note',
          ],
        },
        contained: [
          {
            id: 'Location-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.location',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'HospitalLocationTO.984ZZI',
              },
            ],
            name: 'DAYTSHR',
            resourceType: 'Location',
          },
          {
            id: 'Author-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
          {
            id: 'Provider-1',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
        ],
        identifier: [
          {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
            value: 'NoteTO.5298388',
          },
        ],
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '11506-3',
              display: 'Progress Note',
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://hl7.org/fhir/us/core/CodeSystem/us-core-documentreference-category',
                code: 'clinical-note',
              },
            ],
          },
        ],
        subject: {
          reference: 'Patient/974',
        },
        date: '2023-11-16T14:40:00.003-05:00',
        author: [
          {
            reference: '#Author-0',
          },
        ],
        authenticator: {
          extension: [
            {
              url:
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/noteAuthenticatedWhen',
              valueDateTime: '2023-11-16T14:50:26-05:00',
            },
          ],
          reference: '#Provider-1',
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data:
                'DQogTE9DQUwgVElUTEU6IFNUQUdJTkcgKFROTSkgVVJJTkFSWSBCTEFEREVSICAgICAgICAgICAgICAgICAgICAgIA0KREFURSBPRiBOT1RFOiBOT1YgMTYsIDIwMjNAMTQ6NDAgICAgIEVOVFJZIERBVEU6IE5PViAxNiwgMjAyM0AxNDo0MDo0NyAgICAgIA0KICAgICAgQVVUSE9SOiBBSE1FRCxNQVJVRiAgICAgICAgICBFWFAgQ09TSUdORVI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgDQogICAgIFVSR0VOQ1k6ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUQVRVUzogQ09NUExFVEVEICAgICAgICAgICAgICAgICAgICAgDQoNCiAgICoqKiBTVEFHSU5HIChUTk0pIFVSSU5BUlkgQkxBRERFUiBIYXMgQURERU5EQSAqKioNCg0KVVJJTkFSWSBCTEFEREVSDQo2dGggZWRpdGlvbiBBSkNDIENhbmNlciBTdGFnaW5nIE1hbnVhbA0KDQoNCnRlc3Rpbmcgbm90ZSB3aXRoIGtic3QgdGVhbQ0KIA0KQ0xJTiAgIFBBVEggICAgIFBSSU1BUlkgVFVNT1IgKFQpDQogW1hdICAgWyBdICAgVFggICAgICBQcmltYXJ5IHR1bW9yIGNhbm5vdCBiZSBhc3Nlc3NlZA0KIFsgXSAgIFsgXSAgIFQwICAgICAgTm8gZXZpZGVuY2Ugb2YgcHJpbWFyeSB0dW1vcg0KIFsgXSAgIFsgXSAgIFRhICAgICAgTm9uIGludmFzaXZlIHBhcGlsbGFyeSBjYXJjaW5vbWENCiBbIF0gICBbIF0gICBUaXMgICAgIENhcmNpbm9tYSBpbiBzaXR1IChmbGF0IHR1bW9yKQ0KIFtYXSAgIFsgXSAgIFQxICAgICAgVHVtb3IgaW52YWRlcyBzdWJlcGl0aGVsaWFsIGNvbm5lY3RpdmUgdGlzc3VlDQogWyBdICAgWyBdICAgVDIgICAgICBUdW1vciBpbnZhZGVzIG11c2NsZQ0KIFsgXSAgIFsgXSAgICAgICAgICAgVDJhICAgICBUdW1vciBJbnZhZGVzIHN1cGVyZmljaWFsIChpbm5lciBoYWxmKQ0KIFsgXSAgIFsgXSAgICAgICAgICAgVDJiICAgICBUdW1vciBJbnZhZGVzIGRlZXAgbXVzY2xlIChvdXRlciBoYWxmKQ0KIFsgXSAgIFtYXSAgIFQzICAgICAgVHVtb3IgaW52YWRlcyBwZXJpdmVzaWNhbCB0aXNzdWUNCiBbIF0gICBbWF0gICAgICAgICAgIFQzYSAgICAgTWljcm9zY29waWNhbGx5DQogWyBdICAgWyBdICAgICAgICAgICBUM2IgICAgIE1hY3Jvc2NvcGljYWxseSAoZXh0cmF2ZXNpY2FsIG1hc3MpDQogWyBdICAgWyBdICAgVDQgICAgICBUdW1vciBpbnZhZGVzIGFueSBvZiB0aGUgZm9sbG93aW5nOiBwcm9zdGF0ZSwNCiAgICAgICAgICAgICAgICAgICAgICAgdXRlcnVzLCB2YWdpbmEsIHBlbHZpYyBvciBhYmRvbWluYWwgd2FsbA0KIFsgXSAgIFsgXSAgICAgICAgICAgVDRhICAgICBUdW1vciBpbnZhZGVzIHByb3N0YXRlLCB1dGVydXMsIHZhZ2luYQ0KIFtYXSAgIFtYXSAgICAgICAgICAgVDRiICAgICBUdW1vciBpbnZhZGVzIHBlbHZpYyB3YWxsLCBhYmRvbWluYWwgd2FsbA0KIA0KIA0KICAgICAgICAgICAgICAgUkVHSU9OQUwgTFlNUEggTk9ERVMgKE4pDQogWyBdICAgWyBdICAgTlggICAgICBSZWdpb25hbCBseW1waCBub2RlIG1ldGFzdGFzaXMgY2Fubm90IGJlIGFzc2Vzc2VkDQogWyBdICAgWyBdICAgTjAgICAgICBObyByZWdpb25hbCBseW1waCBub2RlIG1ldGFzdGFzaXMNCiBbIF0gICBbWF0gICBOMSAgICAgIE1ldHMgaW4gYSBzaW5nbGUgbHltcGggbm9kZSwgMiBjbSBvciBsZXNzIGluDQogICAgICAgICAgICAgICAgICAgICAgIGdyZWF0ZXN0IGRpbWVuc2lvbi4NCiBbIF0gICBbWF0gICBOMiAgICAgIE1ldHMgaW4gYSBzaW5nbGUgbHltcGggbm9kZSBtb3JlIHRoYW4gMiBidXQgbm90DQogICAgICAgICAgICAgICAgICAgICAgIG1vcmUgdGhhbiA1IGNtIGluIGdyZWF0ZXN0IGRpbWVuc2lvbjsgbXVsdGlwbGUNCiAgICAgICAgICAgICAgICAgICAgICAgbHltcGggbm9kZXMsIG5vbmUgbW9yZSB0aGFuIDUgY20gaW4gZ3JlYXRlc3QNCiAgICAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9uLg0KIFsgXSAgIFsgXSAgIE4zICAgICAgTWV0YXN0YXNpcyBpbiBhIGx5bXBoIG5vZGUgbW9yZSB0aGFuIDUgY20NCiANCiAgICAgICAgICAgICAgIERJU1RBTlQgTUVUQVNUQVNJUyAoTSkNCiBbIF0gICBbWF0gICBNWCAgICAgIFByZXNlbmNlIG9mIGRpc3RhbnQgbWV0YXN0YXNpcyBjYW5ub3QgYmUgYXNzZXNzZWQNCiBbIF0gICBbWF0gICBNMCAgICAgIE5vIGRpc3RhbnQgbWV0YXN0YXNpcw0KIFsgXSAgIFsgXSAgIE0xICAgICAgRGlzdGFudCBtZXRhc3Rhc2lzDQogDQpTVEFHRSBHUk9VUElORw0KIFsgXSAgIFsgXSAgIE9hICAgICAgVGEgICAgICBOMCAgICAgIE0wDQogWyBdICAgWyBdICAgT2lzICAgICBUaXMgICAgIE4wICAgICAgTTANCiBbIF0gICBbIF0gICBJICAgICAgIFQxICAgICAgTjAgICAgICBNMA0KIFsgXSAgIFtYXSAgIElJICAgICAgVDJhICAgICBOMCAgICAgIE0wDQogWyBdICAgWyBdICAgICAgICAgICBUMmIgICAgIE4wICAgICAgTTANCiBbIF0gICBbIF0gICBJSUkgICAgIFQzYSAgICAgTjAgICAgICBNMA0KIFsgXSAgIFtYXSAgICAgICAgICAgVDNiICAgICBOMCAgICAgIE0wDQogWyBdICAgWyBdICAgICAgICAgICBUNGEgICAgIE4wICAgICAgTTANCiBbIF0gICBbIF0gICBJViAgICAgIFQ0YiAgICAgTjAgICAgICBNMA0KIFtYXSAgIFsgXSAgICAgICAgICAgQW55IFQgICBOMSAgICAgIE0wDQogW1hdICAgWyBdICAgICAgICAgICBBbnkgVCAgIE4yICAgICAgTTANCiBbWF0gICBbIF0gICAgICAgICAgIEFueSBUICAgTjMgICAgICBNMA0KIFtYXSAgIFsgXSAgICAgICAgICAgQW55IFQgICBBbnkgTiAgIE0xDQogDQogICAgICAgICAgICAgICAgICAgICAgIEdSQURFDQogICAgICAgIFsgXSAgIEdYICAgICAgR3JhZGUgY2Fubm90IGJlIGFzc2Vzc2VkDQogICAgICAgIFtYXSAgIEcxICAgICAgV2VsbCBkaWZmZXJlbnRpYXRlZA0KICAgICAgICBbWF0gICBHMiAgICAgIE1vZCBkaWZmZXJlbnRpYXRlZA0KICAgICAgICBbIF0gICBHMyAgICAgIFBvb3JseSBkaWZmZXJlbnRpYXRlZA0KICAgICAgICBbIF0gICBHNCAgICAgIFVuZGlmZmVyZW50aWF0ZWQNCiANCiANCk9QICM1OThjICg1NTIpIEFwcHJvdmVkIDEyLzk5IFJldiAwMy8wMw0KIA0KL2VzLyBNQVJVRiBBSE1FRA0KUEhZU0lDSUFODQpTaWduZWQ6IDExLzE2LzIwMjMgMTQ6NTANCg0KMTEvMTYvMjAyMyBBRERFTkRVTSAgICAgICAgICAgICAgICAgICAgICBTVEFUVVM6IENPTVBMRVRFRA0KQWRkZW5kdW0gdGVzdCB3aXRoIEtCU1QgdGVhbSANCiANCi9lcy8gTUFSVUYgQUhNRUQNClBIWVNJQ0lBTg0KU2lnbmVkOiAxMS8xNi8yMDIzIDE0OjU3DQo=',
              title: 'STAGING (TNM) URINARY BLADDER',
              creation: '2023-11-16T14:40:00-05:00',
            },
          },
        ],
        context: {
          related: [
            {
              reference: '#Location-0',
            },
          ],
        },
        resourceType: 'DocumentReference',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl:
        'https://mhv-sysb-api.myhealth.va.gov/fhir/DocumentReference/999',
      resource: {
        id: '999',
        meta: {
          versionId: '2',
          lastUpdated: '2024-05-03T12:05:25.407-04:00',
          source: '#YJJUQxzI9g1Bx8zi',
          profile: [
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.note',
          ],
        },
        contained: [
          {
            id: 'Location-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.location',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'HospitalLocationTO.552',
              },
            ],
            name: 'DAYTON',
            resourceType: 'Location',
          },
          {
            id: 'Author-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
          {
            id: 'Provider-1',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
        ],
        identifier: [
          {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
            value: 'NoteTO.5281863',
          },
        ],
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '11506-3',
              display: 'Progress Note',
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://hl7.org/fhir/us/core/CodeSystem/us-core-documentreference-category',
                code: 'clinical-note',
              },
            ],
          },
        ],
        subject: {
          reference: 'Patient/974',
        },
        date: '2022-08-05T16:56:00.003-04:00',
        author: [
          {
            reference: '#Author-0',
          },
        ],
        authenticator: {
          extension: [
            {
              url:
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/noteAuthenticatedWhen',
              valueDateTime: '2022-08-05T16:58:46-04:00',
            },
          ],
          reference: '#Provider-1',
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data:
                'DQogTE9DQUwgVElUTEU6IEMmUCBFWEFNIE5PVEUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KREFURSBPRiBOT1RFOiBBVUcgMDUsIDIwMjJAMTY6NTYgICAgIEVOVFJZIERBVEU6IEFVRyAwNSwgMjAyMkAxNjo1Njo1MyAgICAgIA0KICAgICAgQVVUSE9SOiBBSE1FRCxNQVJVRiAgICAgICAgICBFWFAgQ09TSUdORVI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgDQogICAgIFVSR0VOQ1k6ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUQVRVUzogQ09NUExFVEVEICAgICAgICAgICAgICAgICAgICAgDQoNCiAgICoqKiBDJlAgRVhBTSBOT1RFIEhhcyBBRERFTkRBICoqKg0KDQp0aGlzIGlzIGEgY25wIGV4YW0gbm90ZSAsIHNob3VsZSBiZSBhdmFpbGFibGUgaW4gbWh2IGltbWVkaWF0ZWx5ICwgTWFydWYgQS4NCiANCi9lcy8gTUFSVUYgQUhNRUQNClBIWVNJQ0lBTg0KU2lnbmVkOiAwOC8wNS8yMDIyIDE2OjU4DQoNCjEyLzA3LzIwMjMgQURERU5EVU0gICAgICAgICAgICAgICAgICAgICAgU1RBVFVTOiBDT01QTEVURUQNCnRlc3QNCiANCi9lcy8gTUFSVUYgQUhNRUQNClBIWVNJQ0lBTg0KU2lnbmVkOiAxMi8wNy8yMDIzIDEwOjAwDQo=',
              title: 'C&P EXAM NOTE',
              creation: '2022-08-05T16:56:00-04:00',
            },
          },
        ],
        context: {
          related: [
            {
              reference: '#Location-0',
            },
          ],
        },
        resourceType: 'DocumentReference',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl:
        'https://mhv-sysb-api.myhealth.va.gov/fhir/DocumentReference/1001',
      resource: {
        id: '1001',
        meta: {
          versionId: '2',
          lastUpdated: '2024-05-03T12:05:25.407-04:00',
          source: '#YJJUQxzI9g1Bx8zi',
          profile: [
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.note',
          ],
        },
        contained: [
          {
            id: 'Location-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.location',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'HospitalLocationTO.984',
              },
            ],
            name: 'DAYTSHR TEST LAB',
            resourceType: 'Location',
          },
          {
            id: 'Author-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
          {
            id: 'Provider-1',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
        ],
        identifier: [
          {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
            value: 'NoteTO.5281857',
          },
        ],
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '11506-3',
              display: 'Progress Note',
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://hl7.org/fhir/us/core/CodeSystem/us-core-documentreference-category',
                code: 'clinical-note',
              },
            ],
          },
        ],
        subject: {
          reference: 'Patient/974',
        },
        date: '2022-08-05T11:29:00.003-04:00',
        author: [
          {
            reference: '#Author-0',
          },
        ],
        authenticator: {
          extension: [
            {
              url:
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/noteAuthenticatedWhen',
              valueDateTime: '2022-08-05T11:50:40-04:00',
            },
          ],
          reference: '#Provider-1',
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data:
                'DQogTE9DQUwgVElUTEU6IEFESEMgRElTQ0hBUkdFIE5PVEUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KREFURSBPRiBOT1RFOiBBVUcgMDUsIDIwMjJAMTE6MjkgICAgIEVOVFJZIERBVEU6IEFVRyAwNSwgMjAyMkAxMToyOTo0NiAgICAgIA0KICAgICAgQVVUSE9SOiBBSE1FRCxNQVJVRiAgICAgICAgICBFWFAgQ09TSUdORVI6ICAgICAgICAgICAgICAgICAgICAgICAgICAgDQogICAgIFVSR0VOQ1k6ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUQVRVUzogQ09NUExFVEVEICAgICAgICAgICAgICAgICAgICAgDQoNClRoaXMgaXMgIGEgdGVzdCBub3RlLCBNYXJ1ZiANCiANCi9lcy8gTUFSVUYgQUhNRUQNClBIWVNJQ0lBTg0KU2lnbmVkOiAwOC8wNS8yMDIyIDExOjUwDQo=',
              title: 'ADHC DISCHARGE NOTE',
              creation: '2022-08-05T11:29:00-04:00',
            },
          },
        ],
        context: {
          related: [
            {
              reference: '#Location-0',
            },
          ],
        },
        resourceType: 'DocumentReference',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl:
        'https://mhv-sysb-api.myhealth.va.gov/fhir/DocumentReference/1102',
      resource: {
        id: '1102',
        meta: {
          versionId: '2',
          lastUpdated: '2024-05-03T12:05:25.407-04:00',
          source: '#YJJUQxzI9g1Bx8zi',
          profile: [
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.note',
          ],
        },
        contained: [
          {
            id: 'Location-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.location',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'HospitalLocationTO.552',
              },
            ],
            name: 'DAYTON',
            resourceType: 'Location',
          },
          {
            id: 'Author-0',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
          {
            id: 'Provider-1',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
                value: 'AuthorTO.36556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
              },
            ],
            resourceType: 'Practitioner',
          },
        ],
        identifier: [
          {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.984',
            value: 'NoteTO.5281877',
          },
        ],
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '18842-5',
              display: 'Discharge summary',
            },
          ],
          text: 'DISCHARGE SUMMARY',
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://hl7.org/fhir/us/core/CodeSystem/us-core-documentreference-category',
                code: 'clinical-note',
              },
            ],
          },
        ],
        subject: {
          reference: 'Patient/974',
        },
        date: '2022-08-09T13:41:23.003-04:00',
        author: [
          {
            reference: '#Author-0',
          },
        ],
        authenticator: {
          extension: [
            {
              url:
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/noteAuthenticatedWhen',
              valueDateTime: '2022-08-09T13:44:59-04:00',
            },
          ],
          reference: '#Provider-1',
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data:
                'DQogTE9DQUwgVElUTEU6IERpc2NoYXJnZSBTdW1tYXJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KU1RBTkRBUkQgVElUTEU6IERJU0NIQVJHRSBTVU1NQVJZICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgRElDVCBEQVRFOiBBVUcgMDksIDIwMjJAMTM6NDIgICAgIEVOVFJZIERBVEU6IEFVRyAwOSwgMjAyMkAxMzo0MzowMiAgICAgIA0KIERJQ1RBVEVEIEJZOiBBSE1FRCxNQVJVRiAgICAgICAgICAgICBBVFRFTkRJTkc6IEFITUVELE5BSkVFQiAgICAgICAgICAgICAgICAgDQogICAgIFVSR0VOQ1k6IHJvdXRpbmUgICAgICAgICAgICAgICAgICAgIFNUQVRVUzogQ09NUExFVEVEICAgICAgICAgICAgICAgICAgICAgDQoNCiANCiANCkRBVEUgT0YgQURNSVNTSU9OOg0KREFURSBPRiBESVNDSEFSR0U6IEF1ZyA5LDIwMjINCiANClBSSU5DSVBMRSBESVNDSEFSR0UgRElBR05PU0lTOiBURVNUIERJU0dOT1NJUywgTWFydWYgQWhtZWQuDQpBRERJVElPTkFMIERJQUdOT1NFUzoNCiANCkNPTlNVTFRBTlQoUyk6DQpQUk9DRURVUkUoUyk6DQogDQpCUklFRiBBRE1JU1NJT04gSElTVE9SWToNCjcxIHllYXIgb2xkIE1BTEUgdGVzdA0KIA0KQlJJRUYgQURNSVNTSU9OIFBIWVNJQ0FMIEVYQU06ICB0ZXN0IGV4YW0NCiANCkFETUlTU0lPTiBMQUIvRUtHL1gtUkFZIFJFU1VMVFM6ICB0ZXN0IGFnYWluDQogDQpIT1NQSVRBTCBDT1VSU0U6DQogIHZpYTJ2ZGlmIHRyYW5zc3RpdGlvbg0KIA0KQ09ORElUSU9OIE9OIERJU0NIQVJHRTogdGVzdA0KIA0KRElTQ0hBUkdFIElOU1RSVUNUSU9OUzoNCiAgIEFjdGl2aXR5OiAgICB0ZXN0MQ0KICAgRGlldDogICAgICAgIHRlc3QyDQogICBNZWRpY2F0aW9uczogdGVzdDMNCiAgIFNwZWNpYWwgSW5zdHJ1Y3Rpb25zOiB0ZXN0IGFnYWluDQogICBGb2xsb3ctdXAgUGxhbnM6IHRlc3QgYWdhaW4gYWdhaW4NCiANCi9lcy8gTUFSVUYgQUhNRUQNClBIWVNJQ0lBTg0KU2lnbmVkOiAwOC8wOS8yMDIyIDEzOjQ0DQogDQovZXMvIE1VQVpaQU0gS0hBTg0KUGh5c2ljaWFuDQpDb3NpZ25lZDogMDgvMTIvMjAyMiAxMjoxNw0KZm9yIE5BSkVFQiBBSE1FRCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICANCkFNT0QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgDQo=',
              title: 'Discharge Summary',
              creation: '2022-08-09T13:41:23-04:00',
            },
          },
        ],
        context: {
          related: [
            {
              reference: '#Location-0',
            },
          ],
        },
        resourceType: 'DocumentReference',
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl:
        'https://mhv-intb-api.myhealth.va.gov/fhir/DocumentReference/7509',
      resource: {
        resourceType: 'DocumentReference',
        id: 'ex-MHV-note-3',
        meta: {
          profile: [
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.note',
          ],
        },
        text: {
          status: 'generated',
          div:
            '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: DocumentReference</b><a name="ex-MHV-note-4"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource DocumentReference &quot;ex-MHV-note-4&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-VA.MHV.PHR.note.html">VA MHV PHR Notes</a></p></div><p><b>identifier</b>: id:\u00a0NoteTO.5281877\u00a0(use:\u00a0USUAL)</p><p><b>status</b>: current</p><p><b>type</b>: DISCHARGE SUMMARY <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#18842-5 &quot;Discharge summary&quot;)</span></p><p><b>category</b>: Clinical Note <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://hl7.org/fhir/us/core/STU5.0.1/CodeSystem-us-core-documentreference-category.html">US Core DocumentReferences Category Codes</a>#clinical-note)</span></p><p><b>subject</b>: <a href="Patient-ex-MHV-patient-1.html">Patient/ex-MHV-patient-1</a> &quot; DAYTSHR&quot;</p><p><b>date</b>: Aug 9, 2022, 8:41:23\u202fAM</p><p><b>author</b>: <a name="ex-MHV-practitioner-36556"> </a></p><blockquote><p/><p><a name="ex-MHV-practitioner-36556"> </a></p><p><b>identifier</b>: id:\u00a0AuthorTO.37556\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DOE,JOHN</p></blockquote><p><b>authenticator</b>: <a name="ex-MHV-practitioner-36556"> </a></p><blockquote><p/><p><a name="ex-MHV-practitioner-36556"> </a></p><p><b>identifier</b>: id:\u00a0AuthorTO.37556\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DOE,JOHN</p></blockquote><blockquote><p><b>content</b></p><h3>Attachments</h3><table class="grid"><tr><td style="display: none">-</td><td><b>ContentType</b></td><td><b>Data</b></td><td><b>Title</b></td></tr><tr><td style="display: none">*</td><td>text/plain</td><td>(base64 data - 1080 bytes)</td><td>Discharge Summary</td></tr></table></blockquote><h3>Contexts</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Related</b></td></tr><tr><td style="display: none">*</td><td><a name="ex-MHV-location-552"> </a><blockquote><p/><p><a name="ex-MHV-location-552"> </a></p><p><b>identifier</b>: id:\u00a0HospitalLocationTO.552\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DAYTON</p></blockquote></td></tr></table><hr/><blockquote><p><b>Generated Narrative: Practitioner #ex-MHV-practitioner-36556</b><a name="ex-MHV-practitioner-36556"> </a></p><p><b>identifier</b>: id:\u00a0AuthorTO.37556\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DOE,JOHN</p></blockquote><hr/><blockquote><p><b>Generated Narrative: Location #ex-MHV-location-552</b><a name="ex-MHV-location-552"> </a></p><p><b>identifier</b>: id:\u00a0HospitalLocationTO.552\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DAYTON</p></blockquote></div>',
        },
        contained: [
          {
            resourceType: 'Practitioner',
            id: 'ex-MHV-practitioner-36556',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
                value: 'AuthorTO.37556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
                family: 'JOHN',
                given: ['DOE'],
              },
            ],
          },
          {
            resourceType: 'Location',
            id: 'ex-MHV-location-552',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.location',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
                value: 'HospitalLocationTO.552',
              },
            ],
            name: 'DAYTON',
          },
        ],
        identifier: [
          {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'NoteTO.5281877',
          },
        ],
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '18842-5',
              display: 'Discharge summary',
            },
          ],
          text: 'DISCHARGE SUMMARY',
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://hl7.org/fhir/us/core/CodeSystem/us-core-documentreference-category',
                code: 'clinical-note',
              },
            ],
          },
        ],
        subject: {
          reference: 'Patient/ex-MHV-patient-1',
        },
        date: '2022-08-09T13:41:23Z',
        author: [
          {
            reference: '#ex-MHV-practitioner-36556',
          },
        ],
        authenticator: {
          extension: [
            {
              url:
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/noteAuthenticatedWhen',
              valueDateTime: '2022-08-09T13:44:59Z',
            },
          ],
          reference: '#ex-MHV-practitioner-36556',
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data:
                'TE9DQUwgVElUTEU6IERpc2NoYXJnZSBTdW1tYXJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApTVEFOREFSRCBUSVRMRTogRElTQ0hBUkdFIFNVTU1BUlkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgIERJQ1QgREFURTogQVVHIDA5LCAyMDIyQDEzOjQyICAgICBFTlRSWSBEQVRFOiBBVUcgMDksIDIwMjJAMTM6NDM6MDIgICAgICAKIERJQ1RBVEVEIEJZOiBBSE1FRCxNQVJVRiAgICAgICAgICAgICBBVFRFTkRJTkc6IEFITUVELE5BSkVFQiAgICAgICAgICAgICAgICAgCiAgICAgVVJHRU5DWTogcm91dGluZSAgICAgICAgICAgICAgICAgICAgU1RBVFVTOiBDT01QTEVURUQgICAgICAgICAgICAgICAgICAgICAKCiAKIApEQVRFIE9GIEFETUlTU0lPTjoKREFURSBPRiBESVNDSEFSR0U6IEF1ZyA5LDIwMjIKIApQUklOQ0lQTEUgRElTQ0hBUkdFIERJQUdOT1NJUzogVEVTVCBESVNHTk9TSVMsIE1hcnVmIEFobWVkLgpBRERJVElPTkFMIERJQUdOT1NFUzoKIApDT05TVUxUQU5UKFMpOgpQUk9DRURVUkUoUyk6CiAKQlJJRUYgQURNSVNTSU9OIEhJU1RPUlk6CjcxIHllYXIgb2xkIE1BTEUgdGVzdAogCkJSSUVGIEFETUlTU0lPTiBQSFlTSUNBTCBFWEFNOiAgdGVzdCBleGFtCiAKQURNSVNTSU9OIExBQi9FS0cvWC1SQVkgUkVTVUxUUzogIHRlc3QgYWdhaW4KIApIT1NQSVRBTCBDT1VSU0U6CiAgdmlhMnZkaWYgdHJhbnNzdGl0aW9uCiAKQ09ORElUSU9OIE9OIERJU0NIQVJHRTogdGVzdAogCkRJU0NIQVJHRSBJTlNUUlVDVElPTlM6CiAgIEFjdGl2aXR5OiAgICB0ZXN0MQogICBEaWV0OiAgICAgICAgdGVzdDIKICAgTWVkaWNhdGlvbnM6IHRlc3QzCiAgIFNwZWNpYWwgSW5zdHJ1Y3Rpb25zOiB0ZXN0IGFnYWluCiAgIEZvbGxvdy11cCBQbGFuczogdGVzdCBhZ2FpbiBhZ2FpbgogCi9lcy8gTUFSVUYgQUhNRUQKUEhZU0lDSUFOClNpZ25lZDogMDgvMDkvMjAyMiAxMzo0NAogCi9lcy8gTVVBWlpBTSBLSEFOClBoeXNpY2lhbgpDb3NpZ25lZDogMDgvMTIvMjAyMiAxMjoxNwpmb3IgTkFKRUVCIEFITUVEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApBTU9E',
              title: 'Discharge Summary',
            },
          },
        ],
        context: {
          period: {
            start: '2022-08-05T13:41:23Z',
            end: '2022-08-09T13:41:23Z',
          },
          related: [
            {
              reference: '#ex-MHV-location-552',
            },
          ],
        },
      },
      search: {
        mode: 'match',
      },
    },
    {
      fullUrl:
        'https://mhv-intb-api.myhealth.va.gov/fhir/DocumentReference/7510',
      resource: {
        resourceType: 'DocumentReference',
        id: 'ex-MHV-note-4',
        meta: {
          profile: [
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.note',
          ],
        },
        text: {
          status: 'generated',
          div:
            '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: DocumentReference</b><a name="ex-MHV-note-4"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource DocumentReference &quot;ex-MHV-note-4&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-VA.MHV.PHR.note.html">VA MHV PHR Notes</a></p></div><p><b>identifier</b>: id:\u00a0NoteTO.5281877\u00a0(use:\u00a0USUAL)</p><p><b>status</b>: current</p><p><b>type</b>: DISCHARGE SUMMARY <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#18842-5 &quot;Discharge summary&quot;)</span></p><p><b>category</b>: Clinical Note <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://hl7.org/fhir/us/core/STU5.0.1/CodeSystem-us-core-documentreference-category.html">US Core DocumentReferences Category Codes</a>#clinical-note)</span></p><p><b>subject</b>: <a href="Patient-ex-MHV-patient-1.html">Patient/ex-MHV-patient-1</a> &quot; DAYTSHR&quot;</p><p><b>date</b>: Aug 9, 2022, 8:41:23\u202fAM</p><p><b>author</b>: <a name="ex-MHV-practitioner-36556"> </a></p><blockquote><p/><p><a name="ex-MHV-practitioner-36556"> </a></p><p><b>identifier</b>: id:\u00a0AuthorTO.37556\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DOE,JOHN</p></blockquote><p><b>authenticator</b>: <a name="ex-MHV-practitioner-36556"> </a></p><blockquote><p/><p><a name="ex-MHV-practitioner-36556"> </a></p><p><b>identifier</b>: id:\u00a0AuthorTO.37556\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DOE,JOHN</p></blockquote><blockquote><p><b>content</b></p><h3>Attachments</h3><table class="grid"><tr><td style="display: none">-</td><td><b>ContentType</b></td><td><b>Data</b></td><td><b>Title</b></td></tr><tr><td style="display: none">*</td><td>text/plain</td><td>(base64 data - 1080 bytes)</td><td>Discharge Summary</td></tr></table></blockquote><h3>Contexts</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Related</b></td></tr><tr><td style="display: none">*</td><td><a name="ex-MHV-location-552"> </a><blockquote><p/><p><a name="ex-MHV-location-552"> </a></p><p><b>identifier</b>: id:\u00a0HospitalLocationTO.552\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DAYTON</p></blockquote></td></tr></table><hr/><blockquote><p><b>Generated Narrative: Practitioner #ex-MHV-practitioner-36556</b><a name="ex-MHV-practitioner-36556"> </a></p><p><b>identifier</b>: id:\u00a0AuthorTO.37556\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DOE,JOHN</p></blockquote><hr/><blockquote><p><b>Generated Narrative: Location #ex-MHV-location-552</b><a name="ex-MHV-location-552"> </a></p><p><b>identifier</b>: id:\u00a0HospitalLocationTO.552\u00a0(use:\u00a0USUAL)</p><p><b>name</b>: DAYTON</p></blockquote></div>',
        },
        contained: [
          {
            resourceType: 'Practitioner',
            id: 'ex-MHV-practitioner-36556',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.practitioner',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
                value: 'AuthorTO.37556',
              },
            ],
            name: [
              {
                text: 'DOE,JOHN',
                family: 'JOHN',
                given: ['DOE'],
              },
            ],
          },
          {
            resourceType: 'Location',
            id: 'ex-MHV-location-552',
            meta: {
              profile: [
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.location',
              ],
            },
            identifier: [
              {
                use: 'usual',
                system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
                value: 'HospitalLocationTO.552',
              },
            ],
            name: 'DAYTON',
          },
        ],
        identifier: [
          {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'NoteTO.5281877',
          },
        ],
        status: 'current',
        type: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '18842-5',
              display: 'Discharge summary',
            },
          ],
          text: 'DISCHARGE SUMMARY',
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://hl7.org/fhir/us/core/CodeSystem/us-core-documentreference-category',
                code: 'clinical-note',
              },
            ],
          },
        ],
        subject: {
          reference: 'Patient/ex-MHV-patient-1',
        },
        date: '2022-08-09T13:41:23Z',
        author: [
          {
            reference: '#ex-MHV-practitioner-36556',
          },
        ],
        authenticator: {
          extension: [
            {
              url:
                'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/noteAuthenticatedWhen',
              valueDateTime: '2022-08-09T13:44:59Z',
            },
          ],
          reference: '#ex-MHV-practitioner-36556',
        },
        content: [
          {
            attachment: {
              contentType: 'text/plain',
              data:
                'TE9DQUwgVElUTEU6IERpc2NoYXJnZSBTdW1tYXJ5ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApTVEFOREFSRCBUSVRMRTogRElTQ0hBUkdFIFNVTU1BUlkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgIERJQ1QgREFURTogQVVHIDA5LCAyMDIyQDEzOjQyICAgICBFTlRSWSBEQVRFOiBBVUcgMDksIDIwMjJAMTM6NDM6MDIgICAgICAKIERJQ1RBVEVEIEJZOiBBSE1FRCxNQVJVRiAgICAgICAgICAgICBBVFRFTkRJTkc6IEFITUVELE5BSkVFQiAgICAgICAgICAgICAgICAgCiAgICAgVVJHRU5DWTogcm91dGluZSAgICAgICAgICAgICAgICAgICAgU1RBVFVTOiBDT01QTEVURUQgICAgICAgICAgICAgICAgICAgICAKCiAKIApEQVRFIE9GIEFETUlTU0lPTjoKREFURSBPRiBESVNDSEFSR0U6IEF1ZyA5LDIwMjIKIApQUklOQ0lQTEUgRElTQ0hBUkdFIERJQUdOT1NJUzogVEVTVCBESVNHTk9TSVMsIE1hcnVmIEFobWVkLgpBRERJVElPTkFMIERJQUdOT1NFUzoKIApDT05TVUxUQU5UKFMpOgpQUk9DRURVUkUoUyk6CiAKQlJJRUYgQURNSVNTSU9OIEhJU1RPUlk6CjcxIHllYXIgb2xkIE1BTEUgdGVzdAogCkJSSUVGIEFETUlTU0lPTiBQSFlTSUNBTCBFWEFNOiAgdGVzdCBleGFtCiAKQURNSVNTSU9OIExBQi9FS0cvWC1SQVkgUkVTVUxUUzogIHRlc3QgYWdhaW4KIApIT1NQSVRBTCBDT1VSU0U6CiAgdmlhMnZkaWYgdHJhbnNzdGl0aW9uCiAKQ09ORElUSU9OIE9OIERJU0NIQVJHRTogdGVzdAogCkRJU0NIQVJHRSBJTlNUUlVDVElPTlM6CiAgIEFjdGl2aXR5OiAgICB0ZXN0MQogICBEaWV0OiAgICAgICAgdGVzdDIKICAgTWVkaWNhdGlvbnM6IHRlc3QzCiAgIFNwZWNpYWwgSW5zdHJ1Y3Rpb25zOiB0ZXN0IGFnYWluCiAgIEZvbGxvdy11cCBQbGFuczogdGVzdCBhZ2FpbiBhZ2FpbgogCi9lcy8gTUFSVUYgQUhNRUQKUEhZU0lDSUFOClNpZ25lZDogMDgvMDkvMjAyMiAxMzo0NAogCi9lcy8gTVVBWlpBTSBLSEFOClBoeXNpY2lhbgpDb3NpZ25lZDogMDgvMTIvMjAyMiAxMjoxNwpmb3IgTkFKRUVCIEFITUVEICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIApBTU9E',
              title: 'Discharge Summary',
            },
          },
        ],
        context: {
          period: {
            start: '2022-08-12T13:41:23Z',
            end: '2022-08-15T13:41:23Z',
          },
          related: [
            {
              reference: '#ex-MHV-location-552',
            },
          ],
        },
      },
      search: {
        mode: 'match',
      },
    },
  ],
  resourceType: 'Bundle',
};

const single = (req, res) => {
  const { id } = req.params;
  const response = all.entry.find(item => {
    return item.id === id;
  });
  return res.json(response);
};

module.exports = {
  all,
  single,
};
