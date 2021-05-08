package org.oneboot.pro.example.test.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.oneboot.core.lang.math.Money;
import org.oneboot.core.logging.filter.FastjsonSensitiveFilter;
import org.oneboot.pro.example.test.entity.AmUser;
import org.oneboot.pro.example.test.service.IAmUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import lombok.extern.slf4j.Slf4j;

/**
 * <p>
 * 告警用户信息 前端控制器
 * </p>
 *
 * @author jobob
 * @since 2020-12-12
 */
@Slf4j
@RestController
@RequestMapping("/test/am-user")
public class AmUserController extends BaseController {
	@Autowired
	IAmUserService userService;

	@GetMapping
	public Map<String, Object> doIndex() {
		Map<String, Object> map = new HashMap<>();
		// 在这里进行日志的打印
		// 1，是要日志脱敏
		// 2.统一日志输出格式
		String mobile ="12333311111";
		
//		log.info("我是日志.....{}",SensitiveDataUtil.mobileHide(mobile));
		
		AmUser user = new AmUser();
		user.setName("张三");
		user.setMobile("13798989899");
		user.setAuto(new Money("32"));
		user.setGmtCreate(LocalDateTime.now());
		log.info("user: {}", JSONObject.toJSONString(user,new FastjsonSensitiveFilter()));
		log.info("user: {}", user);
		map.put("data", user);
//		map.put("data", userService.list());
		return map;
	}
	public static void main(String[] args) {
		AmUser user = new AmUser();
		user.setName("张三");
		user.setMobile("13798989899");
		log.info("user: {}", JSONObject.toJSONString(user,new FastjsonSensitiveFilter()));
//		System.out.println(JSON.toJSONString(user, new SensitiveInfoSerialize()));
	}
}
