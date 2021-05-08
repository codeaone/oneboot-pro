package org.oneboot.pro.example.test;

import org.oneboot.core.logging.filter.FastjsonSensitiveFilter;
import org.oneboot.pro.example.test.entity.AmUser;

import com.alibaba.fastjson.JSON;

public class Test {
	public static void main(String[] args) {
		AmUser user = new AmUser();
		user.setName("张三");
		user.setMobile("13798989899");
		System.out.println(JSON.toJSONString(user,new FastjsonSensitiveFilter()));
	}
}
