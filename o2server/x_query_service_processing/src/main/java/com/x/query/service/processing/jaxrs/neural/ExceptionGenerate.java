package com.x.query.service.processing.jaxrs.neural;

import com.x.base.core.project.exception.PromptException;

class ExceptionGenerate extends PromptException {

	private static final long serialVersionUID = -9089355008820123519L;

	ExceptionGenerate(String project) {
		super("神经网络({})项目正在生成中.", project);
	}
}
