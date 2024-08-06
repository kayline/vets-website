const all = {
  resourceType: 'Bundle',
  id: 'e0d74d78-4529-4050-adc7-bf1360641636',
  meta: {
    lastUpdated: '2023-05-19T17:42:02.131+00:00',
  },
  type: 'searchset',
  total: 13,
  link: [
    {
      relation: 'self',
      url: '<MHV_MR_HOST>/fhir/DiagnosticReport?category=LAB&patient=258974',
    },
  ],
  entry: [
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-chReport-1',
      meta: {
        profile: [
          'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: ">CH</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>, <span title="Codes: {http://loinc.org 2823-3}">POTASSIUM:SCNC:PT:SER/PLAS:QN:</span>, <span title="Codes: {http://loinc.org 2951-2}">SODIUM:SCNC:PT:SER/PLAS:QN:</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>L MHVSYSTEST </b> unknown, DoB: 1000-01-01 ( <code>urn:oid:2.16.840.1.113883.4.349</code>/942104\u00a0(use:\u00a0USUAL))</td></tr><tr><td>When For</td><td>2021-01-20 16:38:59-0500</td></tr><tr><td>Reported</td><td>2021-01-21 11:32:47-0500</td></tr><tr><td>Identifier:</td><td> <code>urn:fdc:TEST.SALT-LAKE.MED.VA.GOV:LR</code>/1110200002\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>Reference Range</b></td><td><b>Flags</b></td><td><b>Note</b></td><td><b>When For</b></td></tr><tr><td colspan="6"><i>This Observation could not be resolved</i></td></tr><tr><td colspan="6"><i>This Observation could not be resolved</i></td></tr></table></div>',
      },
      contained: [
        {
          resourceType: 'Organization',
          id: 'ex-MHV-organization-552',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.organization',
            ],
          },
          identifier: [
            {
              use: 'usual',
              type: {
                text: 'L',
              },
              system: 'urn:oid:2.16.840.1.113883.4.349',
              value: '552',
            },
          ],
          active: true,
          name: 'DAYTON, OH VAMC',
          address: [
            {
              line: ['4100 W. THIRD STREET'],
              city: 'DAYTON',
              state: 'OH',
              postalCode: '45428',
              country: 'USA',
            },
          ],
        },
        {
          resourceType: 'Practitioner',
          id: 'ex-MHV-practitioner-14934-VA552',
          identifier: [
            {
              system: 'http://va.gov/terminology/vistaDefinedTerms/4',
              value: '14934-VA552',
            },
          ],
          name: [
            {
              family: 'DOE',
              given: ['JANE', 'A'],
            },
          ],
        },
        {
          resourceType: 'Organization',
          id: 'ex-MHV-organization-989',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.organization',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349',
              value: 'LabSiteTO.989',
            },
            {
              system: 'http://hl7.org/fhir/sid/us-npi',
              value: '1234',
            },
          ],
          active: true,
          name: 'Lab Site 989',
        },
        {
          resourceType: 'ServiceRequest',
          id: 'ex-MHV-chOrder-1a',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chOrder',
            ],
          },
          status: 'unknown',
          intent: 'order',
          category: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '108252007',
                  display: 'Laboratory procedure',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/64',
                code: '84140.0000',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/60',
                code: '177',
                display: 'POTASSIUM',
              },
            ],
            text: 'Potassium',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-942104',
          },
          requester: {
            reference: '#ex-MHV-practitioner-14934-VA552',
          },
          performer: [
            {
              reference: '#ex-MHV-organization-552',
            },
          ],
        },
        {
          resourceType: 'Observation',
          id: 'ex-MHV-chTest-1a',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chTest',
            ],
          },
          basedOn: [
            {
              reference: '#ex-MHV-chOrder-1a',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                version: '2.68',
                code: '2823-3',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/95.3',
                code: '4670505',
              },
            ],
            text: 'POTASSIUM',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-942104',
          },
          effectiveDateTime: '1994-01-20T16:38:59-05:00',
          performer: [
            {
              reference: '#ex-MHV-organization-552',
            },
          ],
          valueQuantity: {
            value: 3.5,
            unit: 'mEq/L',
            system: 'http://unitsofmeasure.org',
          },
          interpretation: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                  code: 'L',
                },
              ],
              text: 'L',
            },
          ],
          note: [
            {
              text: 'Normal Range Prior to 8-22-02 was: 3.6 - 5.0 mEq/L.',
            },
          ],
          specimen: {
            reference: '#ex-MHV-chSpecimen-1',
          },
          referenceRange: [
            {
              text: '3.6-5.1',
            },
          ],
        },
        {
          resourceType: 'ServiceRequest',
          id: 'ex-MHV-chOrder-1b',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chOrder',
            ],
          },
          status: 'unknown',
          intent: 'order',
          category: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '108252007',
                  display: 'Laboratory procedure',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/64',
                code: '84295.0000',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/60',
                code: '176',
                display: 'SODIUM',
              },
            ],
            text: 'Sodium',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-942104',
          },
          requester: {
            reference: '#ex-MHV-practitioner-14934-VA552',
          },
          performer: [
            {
              reference: '#ex-MHV-organization-552',
            },
          ],
        },
        {
          resourceType: 'Observation',
          id: 'ex-MHV-chTest-1b',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chTest',
            ],
          },
          basedOn: [
            {
              reference: '#ex-MHV-chOrder-1b',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                version: '2.68',
                code: '2951-2',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/95.3',
                code: '4671912',
              },
            ],
            text: 'SODIUM:SCNC:PT:SER/PLAS:QN:',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-942104',
          },
          effectiveDateTime: '1994-01-20T16:38:59-05:00',
          performer: [
            {
              reference: '#ex-MHV-organization-552',
            },
          ],
          valueQuantity: {
            value: 138,
            unit: 'mEq/L',
            system: 'http://unitsofmeasure.org',
          },
          interpretation: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                  code: 'L',
                },
              ],
              text: 'L',
            },
          ],
          specimen: {
            reference: '#ex-MHV-chSpecimen-1',
          },
          referenceRange: [
            {
              text: '136-145',
            },
          ],
        },
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-chSpecimen-1',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chSpecimen',
            ],
          },
          status: 'available',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0487',
                code: 'SER',
                display: 'Serum',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/61',
                code: '72',
                display: 'SERUM',
              },
            ],
            text: 'SERUM',
          },
          request: [
            {
              reference: '#ex-MHV-chOrder-1a',
            },
          ],
          collection: {
            collectedDateTime: '1994-01-20T16:38:59-05:00',
          },
        },
      ],
      extension: [
        {
          url:
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/Notes',
          valueString: "Jane's Test 1/20/1994 - Second lab",
        },
        {
          url:
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/Notes',
          valueString: 'Added Potassium test',
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:fdc:TEST.SALT-LAKE.MED.VA.GOV:LR',
          value: '1110200002',
        },
      ],
      basedOn: [
        {
          reference: '#ex-MHV-chOrder-1a',
        },
        {
          reference: '#ex-MHV-chOrder-1b',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
        {
          coding: [
            {
              system: 'http://loinc.org',
              version: '2.68',
              code: '2823-3',
            },
          ],
          text: 'POTASSIUM:SCNC:PT:SER/PLAS:QN:',
        },
        {
          coding: [
            {
              system: 'http://loinc.org',
              version: '2.68',
              code: '2951-2',
            },
          ],
          text: 'SODIUM:SCNC:PT:SER/PLAS:QN:',
        },
      ],
      code: {
        text: 'CH',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-942104',
      },
      effectiveDateTime: '1994-01-20T16:38:59-05:00',
      issued: '1994-01-21T11:32:47-05:00',
      performer: [
        {
          reference: '#ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-chSpecimen-1',
        },
      ],
      result: [
        {
          reference: '#ex-MHV-chTest-1a',
        },
        {
          reference: '#ex-MHV-chTest-1b',
        },
      ],
    },
    {
      resourceType: 'DiagnosticReport',
      id: '9953',
      meta: {
        versionId: '22',
        lastUpdated: '2024-05-16T18:08:59.215-04:00',
        source: '#reWo6V0WdeyFTR19',
        profile: [
          'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: ">CH</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>, <span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 CH}">Chemistry</span>, <span title="Codes: {http://loinc.org 2345-7}">GLUCOSE:MCNC:PT:SER/PLAS:QN:</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>L MHVSYSTEST </b> unknown, DoB: 1000-01-01 ( <code>urn:oid:2.16.840.1.113883.4.349</code>/942104\u00a0(use:\u00a0usual))</td></tr><tr><td>When For</td><td>2017-08-02 09:50:57-0400</td></tr><tr><td>Reported</td><td>2017-08-02 09:52:27-0400</td></tr><tr><td>Identifier:</td><td> <code>urn:fdc:TEST.DAYTON.MED.VA.GOV:LR</code>/1172140001\u00a0(use:\u00a0usual)</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>Reference Range</b></td><td><b>Flags</b></td><td><b>Note</b></td><td><b>When For</b></td></tr><tr><td colspan="6"><i>This Observation could not be resolved</i></td></tr></table></div>',
      },
      contained: [
        {
          resourceType: 'Specimen',
          id: 'Specimen-0',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chSpecimen',
            ],
          },
          status: 'available',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0487',
                code: 'SER',
                display: 'Serum',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/61',
                version: '5.2',
                code: '72',
                display: 'SERUM',
              },
            ],
            text: 'SERUM',
          },
          request: [
            {
              reference: '#ServiceRequest-1',
            },
          ],
          collection: {
            collectedDateTime: '1993-08-02T09:50:57-04:00',
          },
        },
        {
          resourceType: 'Practitioner',
          id: 'Provider-1',
          identifier: [
            {
              system: 'http://va.gov/terminology/vistaDefinedTerms/4',
              value: '14934-VA552',
            },
          ],
          name: [
            {
              family: 'DOE',
              given: ['JANE', 'A'],
            },
          ],
        },
        {
          resourceType: 'Organization',
          id: 'Organization-552',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.organization',
            ],
          },
          identifier: [
            {
              use: 'usual',
              type: {
                text: 'FI',
              },
              system: 'urn:oid:2.16.840.1.113883.4.349',
              value: '552',
            },
          ],
          active: true,
          name: 'DAYTON, OH VAMC',
          address: [
            {
              line: ['4100 W. THIRD STREET'],
              city: 'DAYTON',
              state: 'OH',
              postalCode: '45428',
              country: 'USA',
            },
          ],
        },
        {
          resourceType: 'Organization',
          id: 'OrgPerformer-989',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.organization',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349',
              value: '989',
            },
          ],
          active: true,
          name: 'DAYT29.FO-BAYPINES.MED.VA.GOV',
        },
        {
          resourceType: 'ServiceRequest',
          id: 'ServiceRequest-1',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chOrder',
            ],
          },
          status: 'unknown',
          intent: 'order',
          category: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '108252007',
                  display: 'Laboratory procedure',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/64',
                code: '84330.0000',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/60',
                code: '175',
                display: 'GLUCOSE',
              },
            ],
            text: 'Glucose Quant',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-942104',
          },
          requester: {
            reference: '#Provider-1',
          },
          performer: [
            {
              reference: '#Organization-552',
            },
          ],
        },
        {
          resourceType: 'Observation',
          id: 'ChemistryResult-1.1',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.chTest',
            ],
          },
          basedOn: [
            {
              reference: '#ServiceRequest-1',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                version: '2.52',
                code: '2345-7',
              },
              {
                system: 'http://va.gov/terminology/vistaDefinedTerms/95.3',
                version: '2.52',
                code: '4665460',
              },
            ],
            text: 'GLUCOSE',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-942104',
          },
          effectiveDateTime: '1993-08-02T09:50:57-04:00',
          performer: [
            {
              reference: '#Organization-552',
            },
          ],
          valueQuantity: {
            value: 171,
            unit: 'mg/dl',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dl',
          },
          interpretation: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                  code: 'H',
                },
              ],
              text: 'H',
            },
          ],
          note: [
            {
              text: '***PLEASE NOTE NEW CRITICAL VALUE EFFECTIVE 2/2/98***',
            },
          ],
          specimen: {
            reference: '#Specimen-0',
          },
          referenceRange: [
            {
              text: '65-110',
            },
          ],
        },
      ],
      extension: [
        {
          url:
            'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/Notes',
          valueString: "Jane's 8/2  test",
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:fdc:TEST.DAYTON.MED.VA.GOV:LR',
          value: '1172140001',
        },
      ],
      basedOn: [
        {
          reference: '#ServiceRequest-1',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'CH',
            },
          ],
        },
        {
          coding: [
            {
              system: 'http://loinc.org',
              version: '2.52',
              code: '2345-7',
            },
          ],
          text: 'GLUCOSE:MCNC:PT:SER/PLAS:QN:',
        },
      ],
      code: {
        text: 'CH',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-942104',
      },
      effectiveDateTime: '1993-08-02T09:50:57-04:00',
      issued: '1993-08-02T09:52:27.000-04:00',
      performer: [
        {
          reference: '#OrgPerformer-989',
        },
      ],
      specimen: [
        {
          reference: '#Specimen-0',
        },
      ],
      result: [
        {
          reference: '#ChemistryResult-1.1',
        },
      ],
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-1',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 79381-0}">LR MICROBIOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1998-08-03 14:49:00+0000</td></tr><tr><td>Reported</td><td>1998-08-03 14:49:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.MI;7049269\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>When For</b></td></tr><tr><td colspan="3"><i>This Observation could not be resolved</i></td></tr></table><p>Accession [UID]: PARAS 95 264 []            Received: Aug 01, 1998@11:02\nCollection sample: STOOL               Collection date: Jul 30, 1998\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT =&gt; Aug 03, 1998   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND</p></div>',
      },
      contained: [
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-1',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049269;1',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1998-08-03T14:49:00-0400',
          performer: [
            {
              reference: 'Organization/ex-MHV-organization-989',
            },
          ],
          valueString: 'NO OVA OR PARASITES FOUND',
        },
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-1',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabSpecimenTO.6Y100',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'PARAS 95 264',
          },
          status: 'available',
          type: {
            text: 'FECES',
          },
          collection: {
            collectedDateTime: '1998-07-30',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.MI;7049269',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '79381-0',
          },
        ],
        text: 'LR MICROBIOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1998-08-03T14:49:00-0400',
      issued: '1998-08-03T14:49:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-1',
        },
      ],
      result: [
        {
          reference: '#ex-MHV-labTest-1',
        },
      ],
      conclusion:
        'Accession [UID]: PARAS 95 264 []            Received: Aug 01, 1998@11:02\nCollection sample: STOOL               Collection date: Jul 30, 1998\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT => Aug 03, 1998   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND',
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-2',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 79381-0}">LR MICROBIOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1998-08-03 14:49:00+0000</td></tr><tr><td>Reported</td><td>1998-08-03 14:49:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.MI;7049269\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>When For</b></td></tr><tr><td colspan="3"><i>This Observation could not be resolved</i></td></tr></table><p>Accession [UID]: PARAS 95 264 []            Received: Aug 01, 1998@11:02\nCollection sample: STOOL               Collection date: Jul 30, 1998\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT =&gt; Aug 03, 1998   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND</p></div>',
      },
      contained: [
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-1',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049269;1',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1998-08-03T14:49:00-0400',
          performer: [
            {
              reference: 'Organization/ex-MHV-organization-989',
            },
          ],
          valueString: 'NO OVA OR PARASITES FOUND',
        },
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-1',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabSpecimenTO.6Y100',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'PARAS 95 264',
          },
          status: 'available',
          type: {
            text: 'FECES',
          },
          collection: {
            collectedDateTime: '1998-07-30',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.MI;7049269',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '79381-0',
          },
        ],
        text: 'LR MICROBIOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1998-08-03T14:49:00-0400',
      issued: '1998-08-03T14:49:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-1',
        },
      ],
      result: [
        {
          reference: '#ex-MHV-labTest-1',
        },
      ],
      conclusion:
        'Accession [UID]: PARAS 95 264 []            Received: Aug 01, 1998@11:02\nCollection sample: STOOL               Collection date: Jul 30, 1998\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT => Aug 03, 1998   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND',
    },
    {
      resourceType: 'DocumentReference',
      id: 'ex-MHV-ecg-0',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.ecg',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: DocumentReference</b><a name="ex-MHV-ecg-0"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource DocumentReference &quot;ex-MHV-ecg-0&quot; </p><p style="margin-bottom: 0px">Profile: <a href="StructureDefinition-VA.MHV.PHR.ecg.html">VA MHV PHR ECG</a></p></div><p><b>identifier</b>: id: ClinicalProcedureTO.41359 (use: USUAL)</p><p><b>status</b>: current</p><p><b>type</b>: EKG study <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#11524-6)</span></p><p><b>category</b>: Cardiology <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#LP29708-2)</span>, Clinical Note <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://hl7.org/fhir/us/core/STU5.0.1/CodeSystem-us-core-documentreference-category.html">US Core DocumentReferences Category Codes</a>#clinical-note)</span></p><p><b>subject</b>: <a href="Patient-ex-MHV-patient-1.html">Patient/ex-MHV-patient-1</a> &quot; DAYTSHR&quot;</p><p><b>date</b>: Dec 14, 2000, 5:35:00 AM</p><blockquote><p><b>content</b></p><h3>Attachments</h3><table class="grid"><tr><td>-</td><td><b>ContentType</b></td><td><b>Data</b></td><td><b>Title</b></td></tr><tr><td>*</td><td>text/plain</td><td>UGcuIDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOS8xMi8yMiAxMDoxMQogICAgICAgICAgICAgICAgICAgICAgICAgICBDT05GSURFTlRJQUwgRUNHIFJFUE9SVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAKTUhWTElTQU9ORSxST0JFUlQgTSAgICA2NjYtMTItMzQ1NiAgIE5PVCBJTlBBVElFTlQgICAgICAgICAgICAgIERPQjogQVVHIDksMTk2MgogICAgICAgICAgICAgICAgICAgICAgUFJPQ0VEVVJFIERBVEUvVElNRTogMTIvMTQvMDAgMTE6MzUKLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXQVJEL0NMSU5JQzogQ0FSRElPTE9HWSBPVVRQQVRJRU5UIChMT0MpCiAgICBBR0U6IDM4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU0VYOiAgTUFMRQogICAgSFQgSU46IDA3MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdUIExCUzogMTU0CiAgICBCTE9PRCBQUkVTU1VSRTogICAgICAgICAgICAgICAgICAgICAgICAgVFlQRTogCgogICAgICAgICBWRU5UIFJBVEU6IDA4NiAgICAgICAgUFIgSU5URVJWQUw6IDEzMiAgICAgICBRUlMgRFVSQVRJT046IDEzMgogICAgICAgICBRVDogMzg4ICAgICAgICAgICAgICAgUVRDOiA0NjQKICAgICAgICAgUCBBWElTOiAxMTIgICAgICAgICAgIFIgQVhJUzogNzAgICAgICAgICAgICAgVCBBWElTOiAxNDgKCiAgICBJTlRFUlBSRVRBVElPTjogCgogICAgSU5TVFJVTUVOVCBEWDogIE5vcm1hbCBzaW51cyByaHl0aG0KICAgICAgICAgICAgICAgICAgICBSaWdodCBidW5kbGUgYnJhbmNoIGJsb2NrCiAgICAgICAgICAgICAgICAgICAgTGF0ZXJhbCBpbmZhcmN0ICwgYWdlIHVuZGV0ZXJtaW5lZAogICAgICAgICAgICAgICAgICAgIFBvc3NpYmxlIEluZmVyaW9yIGluZmFyY3QgKGNpdGVkIG9uIG9yIGJlZm9yZSAzMS1KVUwtMjAwMCkKICAgICAgICAgICAgICAgICAgICBBYm5vcm1hbCBFQ0cKICAgICAgICAgICAgICAgICAgICAuCiAgICAgICAgICAgICAgICAgICAgLgogICAgICAgICAgICAgICAgICAgIC4KCiAgICBDT05GSVJNQVRJT04gU1RBVFVTOiBDT05GSVJNRUQKCiAgICBDT01QQVJJU09OOiAKIAoKICAgIENPTU1FTlRTOiAKCiAgICBIRUFSVCBNRURTOgoKICAgIElOVEVSUFJFVEVEIEJZOiBHVVBUQSxTQVRZRU5EUkE=</td><td>ELECTROCARDIOGRAM</td></tr></table></blockquote><h3>Contexts</h3><table class="grid"><tr><td>-</td><td><b>Related</b></td></tr><tr><td>*</td><td><a href="Location-ex-MHV-location-989.html">Location/ex-MHV-location-989</a> &quot;DAYT29 TEST LAB&quot;</td></tr></table></div>',
      },
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'ClinicalProcedureTO.41359',
        },
      ],
      status: 'current',
      type: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '11524-6',
          },
        ],
      },
      category: [
        {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LP29708-2',
            },
          ],
        },
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
      date: '2000-12-14T11:35:00-0400',
      content: [
        {
          attachment: {
            contentType: 'text/plain',
            data:
              'UGcuIDEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOS8xMi8yMiAxMDoxMQogICAgICAgICAgICAgICAgICAgICAgICAgICBDT05GSURFTlRJQUwgRUNHIFJFUE9SVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAKTUhWTElTQU9ORSxST0JFUlQgTSAgICA2NjYtMTItMzQ1NiAgIE5PVCBJTlBBVElFTlQgICAgICAgICAgICAgIERPQjogQVVHIDksMTk2MgogICAgICAgICAgICAgICAgICAgICAgUFJPQ0VEVVJFIERBVEUvVElNRTogMTIvMTQvMDAgMTE6MzUKLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAtIC0gLSAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXQVJEL0NMSU5JQzogQ0FSRElPTE9HWSBPVVRQQVRJRU5UIChMT0MpCiAgICBBR0U6IDM4ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU0VYOiAgTUFMRQogICAgSFQgSU46IDA3MSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdUIExCUzogMTU0CiAgICBCTE9PRCBQUkVTU1VSRTogICAgICAgICAgICAgICAgICAgICAgICAgVFlQRTogCgogICAgICAgICBWRU5UIFJBVEU6IDA4NiAgICAgICAgUFIgSU5URVJWQUw6IDEzMiAgICAgICBRUlMgRFVSQVRJT046IDEzMgogICAgICAgICBRVDogMzg4ICAgICAgICAgICAgICAgUVRDOiA0NjQKICAgICAgICAgUCBBWElTOiAxMTIgICAgICAgICAgIFIgQVhJUzogNzAgICAgICAgICAgICAgVCBBWElTOiAxNDgKCiAgICBJTlRFUlBSRVRBVElPTjogCgogICAgSU5TVFJVTUVOVCBEWDogIE5vcm1hbCBzaW51cyByaHl0aG0KICAgICAgICAgICAgICAgICAgICBSaWdodCBidW5kbGUgYnJhbmNoIGJsb2NrCiAgICAgICAgICAgICAgICAgICAgTGF0ZXJhbCBpbmZhcmN0ICwgYWdlIHVuZGV0ZXJtaW5lZAogICAgICAgICAgICAgICAgICAgIFBvc3NpYmxlIEluZmVyaW9yIGluZmFyY3QgKGNpdGVkIG9uIG9yIGJlZm9yZSAzMS1KVUwtMjAwMCkKICAgICAgICAgICAgICAgICAgICBBYm5vcm1hbCBFQ0cKICAgICAgICAgICAgICAgICAgICAuCiAgICAgICAgICAgICAgICAgICAgLgogICAgICAgICAgICAgICAgICAgIC4KCiAgICBDT05GSVJNQVRJT04gU1RBVFVTOiBDT05GSVJNRUQKCiAgICBDT01QQVJJU09OOiAKIAoKICAgIENPTU1FTlRTOiAKCiAgICBIRUFSVCBNRURTOgoKICAgIElOVEVSUFJFVEVEIEJZOiBHVVBUQSxTQVRZRU5EUkE=',
            title: 'ELECTROCARDIOGRAM',
          },
        },
      ],
      context: {
        related: [
          {
            reference: 'Location/ex-MHV-location-989',
          },
        ],
      },
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-1',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 79381-0}">LR MICROBIOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1995-08-03 14:49:00+0000</td></tr><tr><td>Reported</td><td>1995-08-03 14:49:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.MI;7049269\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>When For</b></td></tr><tr><td colspan="3"><i>This Observation could not be resolved</i></td></tr></table><p>Accession [UID]: PARAS 95 264 []            Received: Aug 01, 1995@11:02\nCollection sample: STOOL               Collection date: Jul 30, 1995\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT =&gt; Aug 03, 1995   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND</p></div>',
      },
      contained: [
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-1',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049269;1',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-03T14:49:00-0400',
          performer: [
            {
              reference: 'Organization/ex-MHV-organization-989',
            },
          ],
          valueString: 'NO OVA OR PARASITES FOUND',
        },
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-1',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabSpecimenTO.6Y100',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'PARAS 95 264',
          },
          status: 'available',
          type: {
            text: 'FECES',
          },
          collection: {
            collectedDateTime: '1995-07-30',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.MI;7049269',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '79381-0',
          },
        ],
        text: 'LR MICROBIOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1995-08-03T14:49:00-0400',
      issued: '1995-08-03T14:49:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-1',
        },
      ],
      result: [
        {
          reference: '#ex-MHV-labTest-1',
        },
      ],
      conclusion:
        'Accession [UID]: PARAS 95 264 []            Received: Aug 01, 1995@11:02\nCollection sample: STOOL               Collection date: Jul 30, 1995\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT => Aug 03, 1995   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND',
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-2',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 79381-0}">LR MICROBIOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1995-08-03 14:49:00+0000</td></tr><tr><td>Reported</td><td>1995-08-03 14:49:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.MI;7049269.93\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>When For</b></td></tr><tr><td colspan="3"><i>This Observation could not be resolved</i></td></tr><tr><td colspan="3"><i>This Observation could not be resolved</i></td></tr><tr><td colspan="3"><i>This Observation could not be resolved</i></td></tr></table><p>Accession [UID]: PARAS 95 263 []            Received: Aug 01, 1995@11:02\nCollection sample: STOOL               Collection date: Jul 29, 1995 07:00\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT =&gt; Aug 03, 1995   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND \nMODERATE WBC\'S SEEN \nMODERATE YEAST</p></div>',
      },
      contained: [
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-2',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049269.93;1',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-03T14:49:00-0400',
          performer: [
            {
              reference: 'Organization/ex-MHV-organization-989',
            },
          ],
          valueString: 'NO OVA OR PARASITES FOUND',
        },
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-3',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049269.93;2',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-03T14:49:00-0400',
          performer: [
            {
              reference: 'Organization/ex-MHV-organization-989',
            },
          ],
          valueString: "MODERATE WBC'S SEEN",
        },
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-4',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049269.93;3',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-03T14:49:00-0400',
          performer: [
            {
              reference: 'Organization/ex-MHV-organization-989',
            },
          ],
          valueString: 'MODERATE YEAST',
        },
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-2',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabSpecimenTO.6Y100',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'PARAS 95 263',
          },
          status: 'available',
          type: {
            text: 'FECES',
          },
          collection: {
            collectedDateTime: '1995-07-29T07:00:00-0400',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.MI;7049269.93',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '79381-0',
          },
        ],
        text: 'LR MICROBIOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1995-08-03T14:49:00-0400',
      issued: '1995-08-03T14:49:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-2',
        },
      ],
      result: [
        {
          reference: '#ex-MHV-labTest-2',
        },
        {
          reference: '#ex-MHV-labTest-3',
        },
        {
          reference: '#ex-MHV-labTest-4',
        },
      ],
      conclusion:
        "Accession [UID]: PARAS 95 263 []            Received: Aug 01, 1995@11:02\nCollection sample: STOOL               Collection date: Jul 29, 1995 07:00\nSite/Specimen: FECES\nProvider: MANGAS,PHYLLIS A\n\n* PARASITOLOGY FINAL REPORT => Aug 03, 1995   TECH CODE: 1003\nParasitology Remark(s):\nNO OVA OR PARASITES FOUND \nMODERATE WBC'S SEEN \nMODERATE YEAST",
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-3',
      meta: {
        profile: [
          'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.MBlabReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: DiagnosticReport ex-MHV-labReport-3</b></p><a name="ex-MHV-labReport-3"> </a><a name="hcex-MHV-labReport-3"> </a><a name="ex-MHV-labReport-3-en-US"> </a><h2><span title="Codes:{http://loinc.org 18725-2}">LR MICROBIOLOGY REPORT</span> (<span title="Codes:{http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>, <span title="Codes:{http://terminology.hl7.org/CodeSystem/v2-0074 MB}">Microbiology</span>) </h2><table class="grid"><tr><td>Subject</td><td>No display for Patient </td></tr><tr><td>When For</td><td>1995-08-01 11:07:00+0000</td></tr><tr><td>Reported</td><td>1995-08-01 11:07:00+0000</td></tr><tr><td>Performers</td><td> <a href="#hcex-MHV-labReport-3/ex-MHV-organization-989">Organization Lab Site 989</a> <a href="#hcex-MHV-labReport-3/ex-MHV-practitioner-mangas">Practitioner MANGAS,PHYLLIS A</a></td></tr><tr><td>Identifier</td><td> <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/LabReportTO.MI;7049271 (use: usual, )</td></tr></table><p><b>Report Details</b></p><table class="grid"><tr><td><b>Code</b></td><td><b>Value</b></td><td><b>Flags</b></td></tr><tr><td><a href="#hcex-MHV-labReport-3/ex-MHV-labTest-5"><span title="Codes:">Parasitology Remark(s)</span></a></td><td>REJECTED=LEAKED</td><td>Final</td></tr><tr><td><a href="#hcex-MHV-labReport-3/ex-MHV-labTest-6"><span title="Codes:">Parasitology Remark(s)</span></a></td><td>MODERATE WBC\'S SEEN</td><td>Final</td></tr><tr><td><a href="#hcex-MHV-labReport-3/ex-MHV-labTest-7"><span title="Codes:">Parasitology Remark(s)</span></a></td><td>MODERATE YEAST</td><td>Final</td></tr></table><hr/><p class="res-header-id"><b>Generated Narrative: Observation  #ex-MHV-labTest-5</b></p><a name="ex-MHV-labReport-3/ex-MHV-labTest-5"> </a><a name="hcex-MHV-labReport-3/ex-MHV-labTest-5"> </a><a name="ex-MHV-labReport-3/ex-MHV-labTest-5-en-US"> </a><p><b>identifier</b>: <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/LabTestTO.MI;7049271;1 (use: usual, )</p><p><b>status</b>: Final</p><p><b>category</b>: <span title="Codes:{http://terminology.hl7.org/CodeSystem/observation-category laboratory}">Laboratory</span></p><p><b>code</b>: <span title="Codes:">Parasitology Remark(s)</span></p><p><b>subject</b>: <a href="Patient-ex-MHV-patient-1.html">MTPZEROTWO DAYTSHR  Male, DoB: 1000-01-01 ( urn:oid:2.16.840.1.113883.4.349#1 (use: usual, ))</a></p><p><b>effective</b>: 1995-08-01 11:07:00+0000</p><p><b>performer</b>: <a href="#ex-MHV-organization-989">#ex-MHV-organization-989</a></p><p><b>value</b>: REJECTED=LEAKED</p><hr/><p class="res-header-id"><b>Generated Narrative: Observation  #ex-MHV-labTest-6</b></p><a name="ex-MHV-labReport-3/ex-MHV-labTest-6"> </a><a name="hcex-MHV-labReport-3/ex-MHV-labTest-6"> </a><a name="ex-MHV-labReport-3/ex-MHV-labTest-6-en-US"> </a><p><b>identifier</b>: <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/LabTestTO.MI;7049271;2 (use: usual, )</p><p><b>status</b>: Final</p><p><b>category</b>: <span title="Codes:{http://terminology.hl7.org/CodeSystem/observation-category laboratory}">Laboratory</span></p><p><b>code</b>: <span title="Codes:">Parasitology Remark(s)</span></p><p><b>subject</b>: <a href="Patient-ex-MHV-patient-1.html">MTPZEROTWO DAYTSHR  Male, DoB: 1000-01-01 ( urn:oid:2.16.840.1.113883.4.349#1 (use: usual, ))</a></p><p><b>effective</b>: 1995-08-01 11:07:00+0000</p><p><b>performer</b>: <a href="#ex-MHV-organization-989">#ex-MHV-organization-989</a></p><p><b>value</b>: MODERATE WBC\'S SEEN</p><hr/><p class="res-header-id"><b>Generated Narrative: Observation  #ex-MHV-labTest-7</b></p><a name="ex-MHV-labReport-3/ex-MHV-labTest-7"> </a><a name="hcex-MHV-labReport-3/ex-MHV-labTest-7"> </a><a name="ex-MHV-labReport-3/ex-MHV-labTest-7-en-US"> </a><p><b>identifier</b>: <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/LabTestTO.MI;7049271;3 (use: usual, )</p><p><b>status</b>: Final</p><p><b>category</b>: <span title="Codes:{http://terminology.hl7.org/CodeSystem/observation-category laboratory}">Laboratory</span></p><p><b>code</b>: <span title="Codes:">Parasitology Remark(s)</span></p><p><b>subject</b>: <a href="Patient-ex-MHV-patient-1.html">MTPZEROTWO DAYTSHR  Male, DoB: 1000-01-01 ( urn:oid:2.16.840.1.113883.4.349#1 (use: usual, ))</a></p><p><b>effective</b>: 1995-08-01 11:07:00+0000</p><p><b>performer</b>: <a href="#ex-MHV-organization-989">#ex-MHV-organization-989</a></p><p><b>value</b>: MODERATE YEAST</p><hr/><p class="res-header-id"><b>Generated Narrative: Specimen  #ex-MHV-specimen-3</b></p><a name="ex-MHV-labReport-3/ex-MHV-specimen-3"> </a><a name="hcex-MHV-labReport-3/ex-MHV-specimen-3"> </a><a name="ex-MHV-labReport-3/ex-MHV-specimen-3-en-US"> </a><p><b>identifier</b>: <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/LabSpecimenTO.6Y100 (use: usual, )</p><p><b>accessionIdentifier</b>: <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/PARAS 95 262 (use: usual, )</p><p><b>status</b>: Available</p><p><b>type</b>: <span title="Codes:">STOOL</span></p><h3>Collections</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Collected[x]</b></td><td><b>BodySite</b></td></tr><tr><td style="display: none">*</td><td>1995-07-28</td><td><span title="Codes:">FECES</span></td></tr></table><hr/><p class="res-header-id"><b>Generated Narrative: Organization  #ex-MHV-organization-989</b></p><a name="ex-MHV-labReport-3/ex-MHV-organization-989"> </a><a name="hcex-MHV-labReport-3/ex-MHV-organization-989"> </a><a name="ex-MHV-labReport-3/ex-MHV-organization-989-en-US"> </a><p><b>identifier</b>: <code>urn:oid:2.16.840.1.113883.4.349</code>/LabSiteTO.989 (use: usual, ), NPI/1234</p><p><b>active</b>: true</p><p><b>name</b>: Lab Site 989</p><hr/><p class="res-header-id"><b>Generated Narrative: Practitioner  #ex-MHV-practitioner-mangas</b></p><a name="ex-MHV-labReport-3/ex-MHV-practitioner-mangas"> </a><a name="hcex-MHV-labReport-3/ex-MHV-practitioner-mangas"> </a><a name="ex-MHV-labReport-3/ex-MHV-practitioner-mangas-en-US"> </a><p><b>identifier</b>: <code>http://nowhere.com/nope</code>/unknown</p><p><b>name</b>: MANGAS,PHYLLIS A</p></div>',
      },
      contained: [
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-5',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049271;1',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-01T11:07:00Z',
          performer: [
            {
              reference: '#ex-MHV-organization-989',
            },
          ],
          valueString: 'REJECTED=LEAKED',
        },
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-6',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049271;2',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-01T11:07:00Z',
          performer: [
            {
              reference: '#ex-MHV-organization-989',
            },
          ],
          valueString: "MODERATE WBC'S SEEN",
        },
        {
          resourceType: 'Observation',
          id: 'ex-MHV-labTest-7',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.labTest',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabTestTO.MI;7049271;3',
            },
          ],
          status: 'final',
          category: [
            {
              coding: [
                {
                  system:
                    'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'laboratory',
                },
              ],
            },
          ],
          code: {
            text: 'Parasitology Remark(s)',
          },
          subject: {
            reference: 'Patient/ex-MHV-patient-1',
          },
          effectiveDateTime: '1995-08-01T11:07:00Z',
          performer: [
            {
              reference: '#ex-MHV-organization-989',
            },
          ],
          valueString: 'MODERATE YEAST',
        },
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-3',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
              value: 'LabSpecimenTO.6Y100',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'PARAS 95 262',
          },
          status: 'available',
          type: {
            text: 'STOOL',
          },
          collection: {
            collectedDateTime: '1995-07-28',
            bodySite: {
              text: 'FECES',
            },
          },
        },
        {
          resourceType: 'Organization',
          id: 'ex-MHV-organization-989',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.organization',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349',
              value: 'LabSiteTO.989',
            },
            {
              system: 'http://hl7.org/fhir/sid/us-npi',
              value: '1234',
            },
          ],
          active: true,
          name: 'Lab Site 989',
        },
        {
          resourceType: 'Practitioner',
          id: 'ex-MHV-practitioner-mangas',
          meta: {
            profile: [
              'http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner',
            ],
          },
          identifier: [
            {
              system: 'http://nowhere.com/nope',
              value: 'unknown',
            },
          ],
          name: [
            {
              text: 'MANGAS,PHYLLIS A',
              family: 'MANGAS',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.MI;7049271',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'MB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '18725-2',
          },
        ],
        text: 'LR MICROBIOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1995-08-01T11:07:00Z',
      issued: '1995-08-01T11:07:00Z',
      performer: [
        {
          reference: '#ex-MHV-organization-989',
        },
        {
          reference: '#ex-MHV-practitioner-mangas',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-3',
        },
      ],
      result: [
        {
          reference: '#ex-MHV-labTest-5',
        },
        {
          reference: '#ex-MHV-labTest-6',
        },
        {
          reference: '#ex-MHV-labTest-7',
        },
      ],
      presentedForm: [
        {
          contentType: 'text/plain',
          data:
            'QWNjZXNzaW9uIFtVSURdOiBQQVJBUyA5NSAyNjIgW10gICAgICAgICAgICBSZWNlaXZlZDogQXVnIDAxLCAxOTk1QDExOjAwCkNvbGxlY3Rpb24gc2FtcGxlOiBTVE9PTCAgICAgICAgICAgICAgIENvbGxlY3Rpb24gZGF0ZTogSnVsIDI4LCAxOTk1ClNpdGUvU3BlY2ltZW46IEZFQ0VTClByb3ZpZGVyOiBNQU5HQVMsUEhZTExJUyBBCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiogUEFSQVNJVE9MT0dZIEZJTkFMIFJFUE9SVCA9PiBBdWcgMDEsIDE5OTUgICBURUNIIENPREU6IDQyMApQYXJhc2l0b2xvZ3kgUmVtYXJrKHMpOgpSRUpFQ1RFRD1MRUFLRUQK',
        },
      ],
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-4',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 60567-5}">LR SURGICAL PATHOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>2000-08-10 15:56:00+0000</td></tr><tr><td>Reported</td><td>2000-08-10 15:56:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTo.SP;6999190\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><p>Date Spec taken: Aug 09, 2000        Pathologist:SEETHA SURYAPRASAD MD\nDate Spec rec\'d: Aug 09, 2000 16:14  Resident: \nDate  completed: Aug 10, 2000        Accession #: SP 00 1982\nSubmitted by: MARK MAZUR MD          Practitioner:MARK MAZUR DPM\n-------------------------------------------------------------------------------\nSpecimen: \nOLD HARDWARE LEFT FOOT X2\nBrief Clinical History:\nThis 71 y/o wm presents with painful hardware L 1st metatarsal head. The\npins were inserted 3 years ago for a bunion procedure. The Bunionprocedure\nis well healed and pt is now wanting the pin removed. Will probably need\nk-wire driver and power for this case.\nPreoperative Diagnosis:\nPAINFUL HARDWARE LEFT FIRST METATARSAL \nPostoperative Diagnosis:\nPAINFUL HARDWARE LEFT FIRST METATARSAL \nGross description:\nRECEIVED UNFIXED AND LABELED &quot;OLD HARDWARE LEFT FOOT X 2&quot; CONSISTS OF TWO\n1.7 CM AND 2.5 CM LONG 1 MM WIDE METALLIC PINS.\n|TAB||NOWRAP|\nDIAGNOSIS: HARDWARE (CLINICALLY FROM LEFT FOOT)</p></div>',
      },
      contained: [
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-4',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'SP 00 1982',
          },
          status: 'available',
          type: {
            text: 'OLD HARDWARE LEFT FOOT X2',
          },
          collection: {
            collectedDateTime: '2000-08-09',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTo.SP;6999190',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '60567-5',
          },
        ],
        text: 'LR SURGICAL PATHOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '2000-08-10T15:56:00-0400',
      issued: '2000-08-10T15:56:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-4',
        },
      ],
      conclusion:
        'Date Spec taken: Aug 09, 2000        Pathologist:SEETHA SURYAPRASAD MD\nDate Spec rec\'d: Aug 09, 2000 16:14  Resident: \nDate  completed: Aug 10, 2000        Accession #: SP 00 1982\nSubmitted by: MARK MAZUR MD          Practitioner:MARK MAZUR DPM\n-------------------------------------------------------------------------------\nSpecimen: \nOLD HARDWARE LEFT FOOT X2\nBrief Clinical History:\nThis 71 y/o wm presents with painful hardware L 1st metatarsal head. The\npins were inserted 3 years ago for a bunion procedure. The Bunionprocedure\nis well healed and pt is now wanting the pin removed. Will probably need\nk-wire driver and power for this case.\nPreoperative Diagnosis:\nPAINFUL HARDWARE LEFT FIRST METATARSAL \nPostoperative Diagnosis:\nPAINFUL HARDWARE LEFT FIRST METATARSAL \nGross description:\nRECEIVED UNFIXED AND LABELED "OLD HARDWARE LEFT FOOT X 2" CONSISTS OF TWO\n1.7 CM AND 2.5 CM LONG 1 MM WIDE METALLIC PINS.\n|TAB||NOWRAP|\nDIAGNOSIS: HARDWARE (CLINICALLY FROM LEFT FOOT)',
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-5',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 60567-5}">LR SURGICAL PATHOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1999-09-27 13:07:00+0000</td></tr><tr><td>Reported</td><td>1999-09-27 13:07:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.SP;7009075\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><p>Date Spec taken: Sep 24, 1999        Pathologist:JAZBIEH MOEZZI MD\nDate Spec rec\'d: Sep 24, 1999 13:46  Resident: \nDate  completed: Sep 27, 1999        Accession #: SP 99 2207\nSubmitted by: KHURSHID YOUSUF MD     Practitioner:KHURSHID YOUSUF\n-------------------------------------------------------------------------------\nSpecimen: \nPOLYPS (A) CECAL\n       (B) PROXIMAL ASCENDING\n       (C) RECTAL\nBrief Clinical History:\nCOLON POLYPS PER FLEX SIG\nPreoperative Diagnosis:\nCOLON POLYPS\nOperative Findings:\n|TAB||NOWRAP|\n1. CECAL POLYPS X 2\n2. ASCENDING COLON POLYP\n3. RECTAL POLYP\nPostoperative Diagnosis:\nSAME\nGross description:\n|TAB||NOWRAP|\nSPECIMEN (A) LABELED CECAL POLYP X 2.  RECEIVED IN FORMALIN IS ONE PALE\nGREY TISSUE FRAGMENT MEASURING 0.4 CM IN DIAMETER.  EMBEDDED ENTIRELY IN\nONE BLOCK.\nSPECIMEN (B) LABELED PROXIMAL ASCENDING COLON.  RECEIVED IN FORMALIN ARE\nTWO PALE BROWN TISSUE FRAGMENTS MEASURING 0.3 CM IN AGGREGATE.  EMBEDDED\nENTIRELY IN ONE BLOCK.\nSPECIMEN (C) LABELED RECTAL POLYP.  RECEIVED IN FORMALIN ARE THREE MINUTE\nTISSUE FRAGMENTS MEASURING 0.3 CM IN AGGREGATE.  EMBEDDED ENTIRELY\nIN ONE BLOCK.\nMicroscopic description: (Date Spec taken: Sep 24, 1999)\n|TAB||BLANK(3)|\n|TAB||NOWRAP|\nDIAGNOSIS:\nA) CECAL POLYP: HYPERPLASTIC POLYP.  (SEE NOTE)\nB &amp;amp; C)\nPROXIMAL ASCENDING COLON AND RECTAL POLYPS: TUBULAR ADENOMAS. (SEE\nNOTE)\n\nNOTE: COAGULATION ARTEFACT AND POOR TISSUE PRESERVATION IS NOTED CAUSING\nDIFFICULTY IN EVALUATION OF LESION.\nDR. YOUSUF WAS NOTIFIED.</p></div>',
      },
      contained: [
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-5',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'SP 99 2207',
          },
          status: 'available',
          type: {
            text:
              'POLYPS (A) CECAL,        (B) PROXIMAL ASCENDING,        (C) RECTAL',
          },
          collection: {
            collectedDateTime: '1999-09-24',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.SP;7009075',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '60567-5',
          },
        ],
        text: 'LR SURGICAL PATHOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1999-09-27T13:07:00-0400',
      issued: '1999-09-27T13:07:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-5',
        },
      ],
      conclusion:
        "Date Spec taken: Sep 24, 1999        Pathologist:JAZBIEH MOEZZI MD\nDate Spec rec'd: Sep 24, 1999 13:46  Resident: \nDate  completed: Sep 27, 1999        Accession #: SP 99 2207\nSubmitted by: KHURSHID YOUSUF MD     Practitioner:KHURSHID YOUSUF\n-------------------------------------------------------------------------------\nSpecimen: \nPOLYPS (A) CECAL\n       (B) PROXIMAL ASCENDING\n       (C) RECTAL\nBrief Clinical History:\nCOLON POLYPS PER FLEX SIG\nPreoperative Diagnosis:\nCOLON POLYPS\nOperative Findings:\n|TAB||NOWRAP|\n1. CECAL POLYPS X 2\n2. ASCENDING COLON POLYP\n3. RECTAL POLYP\nPostoperative Diagnosis:\nSAME\nGross description:\n|TAB||NOWRAP|\nSPECIMEN (A) LABELED CECAL POLYP X 2.  RECEIVED IN FORMALIN IS ONE PALE\nGREY TISSUE FRAGMENT MEASURING 0.4 CM IN DIAMETER.  EMBEDDED ENTIRELY IN\nONE BLOCK.\nSPECIMEN (B) LABELED PROXIMAL ASCENDING COLON.  RECEIVED IN FORMALIN ARE\nTWO PALE BROWN TISSUE FRAGMENTS MEASURING 0.3 CM IN AGGREGATE.  EMBEDDED\nENTIRELY IN ONE BLOCK.\nSPECIMEN (C) LABELED RECTAL POLYP.  RECEIVED IN FORMALIN ARE THREE MINUTE\nTISSUE FRAGMENTS MEASURING 0.3 CM IN AGGREGATE.  EMBEDDED ENTIRELY\nIN ONE BLOCK.\nMicroscopic description: (Date Spec taken: Sep 24, 1999)\n|TAB||BLANK(3)|\n|TAB||NOWRAP|\nDIAGNOSIS:\nA) CECAL POLYP: HYPERPLASTIC POLYP.  (SEE NOTE)\nB &amp; C)\nPROXIMAL ASCENDING COLON AND RECTAL POLYPS: TUBULAR ADENOMAS. (SEE\nNOTE)\n\nNOTE: COAGULATION ARTEFACT AND POOR TISSUE PRESERVATION IS NOTED CAUSING\nDIFFICULTY IN EVALUATION OF LESION.\nDR. YOUSUF WAS NOTIFIED.",
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-6',
      meta: {
        profile: [
          'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.SPlabReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><p class="res-header-id"><b>Generated Narrative: DiagnosticReport ex-MHV-labReport-6</b></p><a name="ex-MHV-labReport-6"> </a><a name="hcex-MHV-labReport-6"> </a><a name="ex-MHV-labReport-6-en-US"> </a><h2><span title="Codes:{http://loinc.org 11526-1}">LR SURGICAL PATHOLOGY REPORT</span> (<span title="Codes:{http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>, <span title="Codes:{http://terminology.hl7.org/CodeSystem/v2-0074 SP}">Surgical Pathology</span>) </h2><table class="grid"><tr><td>Subject</td><td>No display for Patient </td></tr><tr><td>When For</td><td>1999-08-11 16:09:00+0000</td></tr><tr><td>Reported</td><td>1999-08-11 16:09:00+0000</td></tr><tr><td>Performers</td><td> <a href="#hcex-MHV-labReport-6/ex-MHV-organization-989">Organization Lab Site 989</a> <a href="#hcex-MHV-labReport-6/ex-MHV-practitioner-seetha">Practitioner SEETHA SURYAPRASAD MD</a></td></tr><tr><td>Identifier</td><td> <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/LabReportTO.SP;7009190 (use: usual, )</td></tr></table><p><b>Report Details</b></p><hr/><p class="res-header-id"><b>Generated Narrative: Specimen  #ex-MHV-specimen-6</b></p><a name="ex-MHV-labReport-6/ex-MHV-specimen-6"> </a><a name="hcex-MHV-labReport-6/ex-MHV-specimen-6"> </a><a name="ex-MHV-labReport-6/ex-MHV-specimen-6-en-US"> </a><p><b>accessionIdentifier</b>: <code>urn:oid:2.16.840.1.113883.4.349.4.989</code>/SP 99 1804 (use: usual, )</p><p><b>status</b>: Available</p><p><b>type</b>: <span title="Codes:">POLYP @ 12CM</span></p><h3>Collections</h3><table class="grid"><tr><td style="display: none">-</td><td><b>Collected[x]</b></td></tr><tr><td style="display: none">*</td><td>1999-08-09</td></tr></table><hr/><p class="res-header-id"><b>Generated Narrative: Organization  #ex-MHV-organization-989</b></p><a name="ex-MHV-labReport-6/ex-MHV-organization-989"> </a><a name="hcex-MHV-labReport-6/ex-MHV-organization-989"> </a><a name="ex-MHV-labReport-6/ex-MHV-organization-989-en-US"> </a><p><b>identifier</b>: <code>urn:oid:2.16.840.1.113883.4.349</code>/LabSiteTO.989 (use: usual, ), NPI/1234</p><p><b>active</b>: true</p><p><b>name</b>: Lab Site 989</p><hr/><p class="res-header-id"><b>Generated Narrative: Practitioner  #ex-MHV-practitioner-seetha</b></p><a name="ex-MHV-labReport-6/ex-MHV-practitioner-seetha"> </a><a name="hcex-MHV-labReport-6/ex-MHV-practitioner-seetha"> </a><a name="ex-MHV-labReport-6/ex-MHV-practitioner-seetha-en-US"> </a><p><b>identifier</b>: <code>http://nowhere.com/nope</code>/unknown</p><p><b>name</b>: SEETHA SURYAPRASAD MD</p></div>',
      },
      contained: [
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-6',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'SP 99 1804',
          },
          status: 'available',
          type: {
            text: 'POLYP @ 12CM',
          },
          collection: {
            collectedDateTime: '1999-08-09',
          },
        },
        {
          resourceType: 'Organization',
          id: 'ex-MHV-organization-989',
          meta: {
            profile: [
              'https://department-of-veterans-affairs.github.io/mhv-fhir-phr-mapping/StructureDefinition/VA.MHV.PHR.organization',
            ],
          },
          identifier: [
            {
              use: 'usual',
              system: 'urn:oid:2.16.840.1.113883.4.349',
              value: 'LabSiteTO.989',
            },
            {
              system: 'http://hl7.org/fhir/sid/us-npi',
              value: '1234',
            },
          ],
          active: true,
          name: 'Lab Site 989',
        },
        {
          resourceType: 'Practitioner',
          id: 'ex-MHV-practitioner-seetha',
          meta: {
            profile: [
              'http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner',
            ],
          },
          identifier: [
            {
              system: 'http://nowhere.com/nope',
              value: 'unknown',
            },
          ],
          name: [
            {
              text: 'SEETHA SURYAPRASAD MD',
              family: 'SEETHA',
            },
          ],
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.SP;7009190',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'SP',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '11526-1',
          },
        ],
        text: 'LR SURGICAL PATHOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1999-08-11T16:09:00Z',
      issued: '1999-08-11T16:09:00Z',
      performer: [
        {
          reference: '#ex-MHV-organization-989',
        },
        {
          reference: '#ex-MHV-practitioner-seetha',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-6',
        },
      ],
      presentedForm: [
        {
          contentType: 'text/plain',
          data:
            'RGF0ZSBTcGVjIHRha2VuOiBBdWcgMDksIDE5OTkgICAgICAgIFBhdGhvbG9naXN0OlNFRVRIQSBTVVJZQVBSQVNBRCBNRApEYXRlIFNwZWMgcmVjJ2Q6IEF1ZyAxMCwgMTk5OSAxMzoyNyAgUmVzaWRlbnQ6IApEYXRlICBjb21wbGV0ZWQ6IEF1ZyAxMSwgMTk5OSAgICAgICAgQWNjZXNzaW9uICM6IFNQIDk5IDE4MDQKU3VibWl0dGVkIGJ5OiBLQVRITEVFTiBNQVJJRSBXT0xORVIgIFByYWN0aXRpb25lcjpLQVRITEVFTiBNQVJJRSBXT0xORVIgTUQKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpTcGVjaW1lbjogClBPTFlQIEAgMTJDTQpCcmllZiBDbGluaWNhbCBIaXN0b3J5Ogo3MCBZRUFSIE9MRCBNQUxFIEZPUiBTQ1JFRU5JTkcgRVhBTS4gIApPcGVyYXRpdmUgRmluZGluZ3M6ClNNT09USCBCUk9BRCBCQVNFRCBQT0xZUApQb3N0b3BlcmF0aXZlIERpYWdub3NpczoKUFJPQkFCTEUgQkVOSUdOIFBPTFlQCkdyb3NzIGRlc2NyaXB0aW9uOgpSRUNFSVZFRCBJTiBGT1JNQUxJTiBBTkQgTEFCRUxFRCAiUE9MWVAiICBDT05TSVNUUyBPRiBUV08gMSBNTSBGUkFHTUVOVFMKT0YgUElOSyBUSVNTVUUuICBTVUJNSVRURUQgSU4gVE9UQUwgSU4gT05FIEJMT0NLLgpNaWNyb3Njb3BpYyBkZXNjcmlwdGlvbjogKERhdGUgU3BlYyB0YWtlbjogQXVnIDA5LCAxOTk5KQp8VEFCfHxCTEFOSygzKXwKRElBR05PU0lTOgpQT0xZUCBBVCAxMiBDTS4gVFVCVUxBUiBBREVOT01BLgo=',
        },
      ],
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-7',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 60567-5}">LR SURGICAL PATHOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1997-09-09 13:13:00+0000</td></tr><tr><td>Reported</td><td>1997-09-09 13:13:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.SP;7029091\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><p>Date Spec taken: Sep 08, 1997        Pathologist:JAZBIEH MOEZZI MD\nDate Spec rec\'d: Sep 08, 1997 13:08  Resident: \nDate  completed: Sep 09, 1997        Accession #: SP 97 2091\nSubmitted by: DEBRA K LATTA MD       Practitioner:DEBRA K LATTA\n-------------------------------------------------------------------------------\nSpecimen: \n(A) BONE FROM RIGHT FOOT\n(B) BONE RIGHT FOOT</p></div>',
      },
      contained: [
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-7',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'SP 97 2091',
          },
          status: 'available',
          type: {
            text: '(A) BONE FROM RIGHT FOOT, (B) BONE RIGHT FOOT',
          },
          collection: {
            collectedDateTime: '1997-09-08',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.SP;7029091',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '60567-5',
          },
        ],
        text: 'LR SURGICAL PATHOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1997-09-09T13:13:00-0400',
      issued: '1997-09-09T13:13:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-7',
        },
      ],
      conclusion:
        "Date Spec taken: Sep 08, 1997        Pathologist:JAZBIEH MOEZZI MD\nDate Spec rec'd: Sep 08, 1997 13:08  Resident: \nDate  completed: Sep 09, 1997        Accession #: SP 97 2091\nSubmitted by: DEBRA K LATTA MD       Practitioner:DEBRA K LATTA\n-------------------------------------------------------------------------------\nSpecimen: \n(A) BONE FROM RIGHT FOOT\n(B) BONE RIGHT FOOT",
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'ex-MHV-labReport-8',
      meta: {
        profile: [
          'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.labReport',
        ],
      },
      text: {
        status: 'generated',
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml"><h2><span title="Codes: {http://loinc.org 60567-5}">LR SURGICAL PATHOLOGY REPORT</span> (<span title="Codes: {http://terminology.hl7.org/CodeSystem/v2-0074 LAB}">Laboratory</span>) </h2><table class="grid"><tr><td>Subject</td><td><b>MTPZEROTWO,DAYTSHR</b> male, DoB Unknown ( id:\u00a01013699147\u00a0(use:\u00a0OFFICIAL))</td></tr><tr><td>When For</td><td>1997-05-14 09:54:00+0000</td></tr><tr><td>Reported</td><td>1997-05-14 09:54:00+0000</td></tr><tr><td>Identifier:</td><td> id:\u00a0LabReportTO.SP;7029487\u00a0(use:\u00a0USUAL)</td></tr></table><p><b>Report Details</b></p><p>Date Spec taken: May 12, 1997        Pathologist:SEETHA SURYAPRASAD MD\nDate Spec rec\'d: May 12, 1997 14:00  Resident: \nDate  completed: May 13, 1997        Accession #: SP 97 1099\nSubmitted by: DEBRA K LATTA MD       Practitioner:DEBRA K LATTA\n-------------------------------------------------------------------------------\nSpecimen: \nBONE FRAGMENTS, LEFT FOOT</p></div>',
      },
      contained: [
        {
          resourceType: 'Specimen',
          id: 'ex-MHV-specimen-8',
          meta: {
            profile: [
              'https://johnmoehrke.github.io/MHV-PHR/StructureDefinition/VA.MHV.PHR.LabSpecimen',
            ],
          },
          identifier: [
            {
              use: 'usual',
            },
          ],
          accessionIdentifier: {
            use: 'usual',
            system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
            value: 'SP 97 1099',
          },
          status: 'available',
          type: {
            text: 'BONE FRAGMENTS, LEFT FOOT',
          },
          collection: {
            collectedDateTime: '1997-05-12',
          },
        },
      ],
      identifier: [
        {
          use: 'usual',
          system: 'urn:oid:2.16.840.1.113883.4.349.4.989',
          value: 'LabReportTO.SP;7029487',
        },
      ],
      status: 'final',
      category: [
        {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
              code: 'LAB',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '60567-5',
          },
        ],
        text: 'LR SURGICAL PATHOLOGY REPORT',
      },
      subject: {
        reference: 'Patient/ex-MHV-patient-1',
      },
      effectiveDateTime: '1997-05-14T09:54:00-0400',
      issued: '1997-05-14T09:54:00-0400',
      performer: [
        {
          reference: 'Organization/ex-MHV-organization-989',
        },
      ],
      specimen: [
        {
          reference: '#ex-MHV-specimen-8',
        },
      ],
      conclusion:
        "Date Spec taken: May 12, 1997        Pathologist:SEETHA SURYAPRASAD MD\nDate Spec rec'd: May 12, 1997 14:00  Resident: \nDate  completed: May 13, 1997        Accession #: SP 97 1099\nSubmitted by: DEBRA K LATTA MD       Practitioner:DEBRA K LATTA\n-------------------------------------------------------------------------------\nSpecimen: \nBONE FRAGMENTS, LEFT FOOT",
    },
  ],
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
