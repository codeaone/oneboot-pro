package org.oneboot.pro.example.test.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import org.oneboot.core.enums.GenderEnum;
import org.oneboot.core.enums.InEnum;
import org.oneboot.core.lang.math.Money;
import org.oneboot.core.logging.sensitive.Sensitive;
import org.oneboot.core.logging.sensitive.SensitiveTypeEnum;
import org.oneboot.core.validator.DataCheck;
import org.oneboot.core.validator.DataCheckEnum;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 告警用户信息
 * </p>
 *
 * @author jobob
 * @since 2020-12-12
 */
@Data
// @Setter
// @Getter
@EqualsAndHashCode(callSuper = false)
public class AmUser implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 用户名
	 */
	private String name;

	/**
	 * 手机号
	 */
	@Sensitive(type = SensitiveTypeEnum.MOBILE_NO)
	@NotBlank
	@DataCheck(check = DataCheckEnum.MOBILE)
	private String mobile;

	/** 性别 **/
	@InEnum(value = GenderEnum.class)
	private String gender;

	/**
	 * 邮箱
	 */
	private String email;

	/**
	 * 钉钉
	 */
	private String dingding;

	/**
	 * 微信号
	 */
	private String wechat;

	/**
	 * QQ号
	 */
	private String qq;

	/**
	 * 用户状态
	 */
	private String status;

	/**
	 * 扩展属性
	 */
	private String extMap;

	/**
	 * 备注说明
	 */
	private String remark;

	/**
	 * 租户ID
	 */
	private String instId;
	private Money auto;

	/**
	 * 创建时间
	 */
	private LocalDateTime gmtCreate;

	/**
	 * 最后修改时间
	 */
	private LocalDateTime gmtModified;

}
