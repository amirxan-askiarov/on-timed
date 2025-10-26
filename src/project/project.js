export class Project {
  constructor(projectId, name, iconURL, altText) {
    this.id = String(projectId);
    this.name = name;
    this.iconURL = iconURL;
    this.altText = altText;
  }
}
