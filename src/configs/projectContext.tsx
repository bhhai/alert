import { IProjectModel } from "model/project/ProjectModel";
import React, { createContext, useReducer } from "react";

const initProject: IProjectModel = {
  name: "",
  avatar: "",
  category: null,
  domain: [],
  youtube: [],
  twitter: [],
  tiktok: [],
  facebook: [],
  rules: [
    {
      main_keywords: [],
      sub_keywords: [],
      exclude_keywords: [],
    },
  ],
  dateStart: null,
  dateEnd: null,
  share_project: [],
  pervasive_threshold: null,
  pollution_threshold: null,
};

const actions = {
  SET_PROJECT: "SET_PROJECT",
  SET_NAME: "SET_NAME",
  SET_CATEGORY: "SET_CATEGORY",
  ADD_DOMAIN: "ADD_DOMAIN",
  SET_DOMAIN: "SET_DOMAIN",
  ADD_RULE: "ADD_RULE",
  REMOVE_RULE: "REMOVE_RULE",
  SET_RULE: "SET_RULE",
  ADD_TRACKING: "ADD_TRACKING",
  REMOVE_TRACKING: "REMOVE_TRACKING",
  SET_TRACKING: "SET_TRACKING",
  SHARE: "SHARE",
  SET_DATE_START: "SET_DATE_START",
  SET_DATE_END: "SET_DATE_END",
  SET_pervasive_threshold: "SET_pervasive_threshold",
  SET_pollution_threshold: "SET_pollution_threshold",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_PROJECT: {
      return {...state, ...payload.data}
    }
    case actions.SET_pervasive_threshold: {
      return {
        ...state,
        pervasive_threshold: payload.pervasive_threshold,
      };
    }
    case actions.SET_pollution_threshold: {
      return {
        ...state,
        pollution_threshold: payload.pollution_threshold,
      };
    }
    case actions.SET_NAME: {
      return {
        ...state,
        name: payload.name,
      };
    }
    case actions.SET_CATEGORY: {
      return {
        ...state,
        category: payload.id,
      };
    }
    case actions.ADD_RULE: {
      return {
        ...state,
        rules: [
          ...state.rules,
          {
            main_keywords: [],
            sub_keywords: [],
            exclude_keywords: [],
          },
        ],
      };
    }

    case actions.REMOVE_RULE: {
      return {
        ...state,
        rules: state.rules.filter((rule, index) => index !== payload.index),
      };
    }
    case actions.SET_RULE: {
      return {
        ...state,
        rules: state.rules.map((rule, index) =>
          index === payload.index ? { ...rule, [payload.key]: payload.value } : { ...rule }
        ),
      };
    }

    case actions.ADD_TRACKING: {
      return {
        ...state,
        [payload.key]: [...state[payload.key], { url: "" }],
      };
    }

    case actions.REMOVE_TRACKING: {
      return {
        ...state,
        [payload.key]: state[payload.key].filter((el, index) => index !== payload.index),
      };
    }

    case actions.SET_TRACKING: {
      //payload.data la 1 object chua url va thong tin tu server tra ve
      return {
        ...state,
        [payload.key]: state[payload.key].map((el, index) =>
          index === payload.index ? {...el, ...payload.data } : { ...el }
        ),
      };
    }

    case actions.SHARE: {
      return {
        ...state,
        share_project: [
          ...state.share_project,
          { approved_person_id: 0, project_role_id: payload.roleId, user_id: payload.userId },
        ],
      };
    }
    case actions.SET_DATE_START: {
      return {
        ...state,
        dateStart: payload.date,
      };
    }
    case actions.SET_DATE_END: {
      return {
        ...state,
        dateEnd: payload.date,
      };
    }

    default:
      return state;
  }
};

export interface ProjectContextType {
  project: IProjectModel;
  setProject: (data) => void;

  setName: (name) => void;
  setCategory: (id) => void;

  //rules
  addRule: () => void;
  //xoa theo index
  removeRule: (id) => void;
  setRule: (key, index, value) => void;

  //tracking
  addTracking: (key) => void;
  removeTracking: (key, index) => void;
  setTracking: (key, index, data) => void;

  //chia se du an
  share: (userId, roleId) => void;

  setDateStart: (date) => void;
  setDateEnd: (date) => void;
  setPollutionThreshold: (data) => void;
  setPervasiveThreshold: (data) => void;
}

export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initProject);
  const value = {
    project: state,
    setProject: (data) => {
      dispatch({type: actions.SET_PROJECT, payload: {data}})
    },
    setName: (name) => {
      dispatch({ type: actions.SET_NAME, payload: { name } });
    },
    addRule: () => {
      dispatch({ type: actions.ADD_RULE });
    },
    removeRule: (index) => {
      dispatch({ type: actions.REMOVE_RULE, payload: { index } });
    },
    setRule: (key, index, value) => {
      dispatch({ type: actions.SET_RULE, payload: { key, index, value } });
    },
    addTracking: (key) => {
      dispatch({ type: actions.ADD_TRACKING, payload: { key } });
    },
    removeTracking: (key, index) => {
      dispatch({ type: actions.REMOVE_TRACKING, payload: { key, index } });
    },
    setTracking: (key, index, data) => {
      dispatch({ type: actions.SET_TRACKING, payload: { key, index, data } });
    },
    share: (userId, roleId) => {
      dispatch({ type: actions.SHARE, payload: { userId, roleId } });
    },
    setCategory: (id) => {
      dispatch({ type: actions.SET_CATEGORY, payload: { id } });
    },
    setDateStart: (date) => {
      dispatch({ type: actions.SET_DATE_START, payload: { date } });
    },
    setDateEnd: (date) => {
      dispatch({ type: actions.SET_DATE_END, payload: { date } });
    },
    setPollutionThreshold: (pollution_threshold) => {
      dispatch({ type: actions.SET_pollution_threshold, payload: { pollution_threshold } });
    },
    setPervasiveThreshold: (pervasive_threshold) => {
      dispatch({ type: actions.SET_pervasive_threshold, payload: { pervasive_threshold } });
    },
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
