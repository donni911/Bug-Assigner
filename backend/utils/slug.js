import slugify from "slugify";
import Project from "../models/projectModel.js";

export const slugStr = async (str) => {
  let originalSlug = slugify(str, { replacement: "-", lower: true });
  let slug = originalSlug;

  let count = 1;
  while (true) {
    const existingProject = await Project.findOne({ slug });

    if (!existingProject) {
      break; 
    }

    slug = `${originalSlug}-${count}`;
    count++;
  }

  return slug;
};
