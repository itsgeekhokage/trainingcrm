/** @format */
export const validateAgentsData = (req, res, next) => {
  const agents = req.body;

  if (!Array.isArray(agents) || agents.length === 0) {
    return res
      .status(400)
      .json({ message: "Agents data should be a non-empty array" });
  }

  for (const [index, agent] of agents.entries()) {
    const { user_name, mobile_number, password, project_code, training_type_ac_pc, training_type_offline, training_type_online, training_type_quality } =
      agent;

    const requiredFields = {
      user_name,
      mobile_number,
      password,
      project_code,
      training_type_online,
      training_type_offline,
      training_type_ac_pc,
      training_type_quality
    };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({
          message: `Agent ${index + 1}: ${key.replace("_", " ")} is required`,
        });
      }
    }

    if (!/^\d{10}$/.test(mobile_number)) {
      return res.status(400).json({
        message: `Agent ${index + 1}: Mobile number must be exactly 10 digits`,
      });
    }

    if (!/^[a-zA-Z0-9-]+$/.test(project_code)) {
      return res.status(400).json({
        message: `Agent ${index + 1
          }: Project Code can only contain alphanumeric characters and hyphens`,
      });
    }
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { mobile_number, password } = req.body;
  if (!mobile_number || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

export const validateProject = (req, res, next) => {
  const { project_code } = req.body;
  if (!project_code) {
    return res.status(400).json({ message: "Project Code is required" });
  }
  if (!/^[a-zA-Z0-9-]+$/.test(project_code)) {
    return res
      .status(400)
      .json({
        message:
          "Project Code can only contain alphanumeric characters and hyphens",
      });
  }
  next();
};

export const validateHeaderData = (req, res, next) => {
  const headers = req.body;
  for (const [index, header] of headers.entries()) {
    const {
      header_code,
      header_name,
      training_type,
      video_link,
      pdf_link,
      project_code,
    } = header;
    if (
      !header_code ||
      !header_name ||
      !training_type ||
      !video_link ||
      !pdf_link ||
      !project_code
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!/^[a-zA-Z0-9-]+$/.test(header_code)) {
      return res
        .status(400)
        .json({
          message:
            "Header Code can only contain alphanumeric characters and hyphens",
        });
    }
    if (!/^[a-zA-Z0-9-]+$/.test(project_code)) {
      return res
        .status(400)
        .json({
          message:
            "Project Code can only contain alphanumeric characters and hyphens",
        });
    }

  }
  next();
};


export const validateQuestions = (req, res, next) => {
  const { question, options, answer, header_code } = req.body;
  if (!question || !options || !answer || !header_code) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!/^[a-zA-Z0-9-]+$/.test(header_code)) {
    return res.status(400).json({ message: "Header Code can only contain alphanumeric characters and hyphens" });
  }
  next();
}


export const validateQuestionsData = (req, res, next) => {
  const data = req.body;

  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ message: "Data should be a non-empty array" });
  }

  for (const [index, item] of data.entries()) {
    const { project_code, header_code, training_type } = item;
    const requiredFields = { project_code, header_code, training_type };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({
          message: `Item ${index + 1}: ${key.replace("_", " ")} is required`,
        });
      }
    }

    const alphanumericHyphenRegex = /^[a-zA-Z0-9-]+$/;
    const validTrainingTypes = new Set(["online", "offline", "ac_pc", "quality"]);

    if (!alphanumericHyphenRegex.test(project_code)) {
      return res.status(400).json({
        message: `Item ${index + 1}: Project Code can only contain alphanumeric characters and hyphens`,
      });
    }

    if (!alphanumericHyphenRegex.test(header_code)) {
      return res.status(400).json({
        message: `Item ${index + 1}: Header Code can only contain alphanumeric characters and hyphens`,
      });
    }

    if (!validTrainingTypes.has(training_type)) {
      return res.status(400).json({
        message: `Item ${index + 1}: Invalid training type`,
      });
    }
  }

  next();
};