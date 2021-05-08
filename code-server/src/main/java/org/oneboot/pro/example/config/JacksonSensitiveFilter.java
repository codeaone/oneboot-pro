package org.oneboot.pro.example.config;

import java.io.IOException;
import java.util.Objects;

import org.oneboot.core.logging.sensitive.Sensitive;
import org.oneboot.core.logging.sensitive.SensitiveType;
import org.oneboot.core.logging.sensitive.SensitiveTypeFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.ContextualSerializer;

/**
 * @JsonSerialize(using=JacksonDesensitize.class) TODO 可不可以默认过来看下？
 * @author shiqiao.pro
 * @see https://boot.codeaone.com
 */
public class JacksonSensitiveFilter extends JsonSerializer<String> implements ContextualSerializer {

	private Sensitive sensitive;

	//
	public JacksonSensitiveFilter() {

	}

	public JacksonSensitiveFilter(final Sensitive sensitive) {
		this.sensitive = sensitive;
	}

	@Override
	public JsonSerializer<?> createContextual(SerializerProvider prov, BeanProperty property)
			throws JsonMappingException {
		if (property != null) {
			if (Objects.equals(property.getType().getRawClass(), String.class)) { // 非
																					// String
																					// 类直接跳过
				sensitive = property.getAnnotation(Sensitive.class);
				if (sensitive == null) {
					// 这样里的区别 getAnnotation
					sensitive = property.getContextAnnotation(Sensitive.class);
				}
				// 如果能得到注解，就将注解的 value 传入 JacksonDesensitize
				if (sensitive != null) {
					return new JacksonSensitiveFilter(sensitive);
				}
			}
			return prov.findValueSerializer(property.getType(), property);
		}
		return prov.findNullValueSerializer(property);
	}

	@Override
	public void serialize(String value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		if (null == sensitive) {
			gen.writeString(value);
			return;
		}
		if (value != null) {

			SensitiveType sensitiveType = SensitiveTypeFactory.getSensitiveType(sensitive.type().getType());
			if (sensitiveType == null) {
				gen.writeString(value);
			}
			gen.writeString(sensitiveType.shield(value, sensitive.addition()));
		}
	}

}
