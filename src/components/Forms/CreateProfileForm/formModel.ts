export interface FormField {
  profileType: {
    name: string;
  };
  specialistProfileType: {
    name: string;
  };
  workersNumber: {
    name: string;
  };
  services: {
    name: string;
  };
  experienceCases: {
    name: string;
    fields: {
      title: {
        name: string;
      };
      description: {
        name: string;
      };
      startYear: {
        name: string;
      };
      endYear: {
        name: string;
      };
      startMonth: {
        name: string;
      };
      endMonth: {
        name: string;
      };
    };
  };
}

interface FormModel {
  formId: string;
  formField: FormField;
}

export const formModel: FormModel = {
  formId: 'createProfileForm',
  formField: {
    profileType: {
      name: 'profileType'
    },
    specialistProfileType: {
      name: 'specialistProfileType'
    },
    workersNumber: {
      name: 'workersNumber'
    },
    services: {
      name: 'services'
    },
    experienceCases: {
      name: 'experienceCases',
      fields: {
        title: {
          name: 'title'
        },
        description: {
          name: 'description'
        },
        startYear: {
          name: 'startYear'
        },
        endYear: {
          name: 'endYear'
        },
        startMonth: {
          name: 'startMonth'
        },
        endMonth: {
          name: 'endMonth'
        }
      }
    }
  }
};
