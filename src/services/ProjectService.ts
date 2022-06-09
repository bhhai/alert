import urls from "configs/urls";

export default {
  previewByDomain: (value: string, type: "previewNews" | "previewFacebook" | "previewYoutube" | "previewTiktok") => {
    return fetch(urls.project[type], {
      method: "POST",
      body: JSON.stringify({
        value: value,
      }),
    }).then((res) => res.json());
  },

  getProjectType: () => {
    return fetch(urls.project.getProjectType, {
      method: "GET"
    }).then(res => res.json())
  },

  getDepartment: async () => {
    const res = await fetch(urls.project.getDepartment, {
      method: "GET"
    });
    const json = await res.json();
    return json;
  },

  getProjectRole: async () => {
    const res = await fetch(urls.project.getProjectRole, {
      method: "GET"
    });
    const json = await res.json();
    return json;
  },
  createProject: (data) => {
    return fetch(urls.project.createProject, {
      method: "POST",
      body: JSON.stringify({...data}),
    }).then((res) => res.json());
  },

  getUserbyEmail: (email) => {
    return fetch(`${urls.project.getUserByEmail}/${email}`, {
      method: "GET"
    }).then(res => res.json())
  },

  getProjectForUser: () => {
    return fetch(`${urls.project.getProjectForUser}`, {
      method: "GET"
    }).then(res => res.json())
  },
  getProjectById: () => {
    return fetch(`${urls.project.getProjectById}`, {
      method: 'GET'
    }).then(res => res.json())
  }

  
};
