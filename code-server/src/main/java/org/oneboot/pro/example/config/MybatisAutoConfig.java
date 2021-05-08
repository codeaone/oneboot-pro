package org.oneboot.pro.example.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.pagination.optimize.JsqlParserCountOptimize;

/**
 * 
 * @author shiqiao.pro
 * @see https://boot.codeaone.com
 */
@EnableTransactionManagement
@Configuration
@MapperScan({ "org.oneboot.pro.example.test.mapper" })
public class MybatisAutoConfig {
	/*@Bean
	public PagingPlugin page() {
		PagingPlugin paging = new PagingPlugin();
		paging.setDialect("mysql");
		paging.setPageSqlId(".*.searchPage(.*)");

		return paging;
	}

	@Bean
	public MybatisQueryPlugin mybatisQueryPlugin() {
		return new MybatisQueryPlugin();
	}

	@Bean
	public MybatisUpdatePlugin mybatisUpdatePlugin() {
		return new MybatisUpdatePlugin();
	}*/

	/**
	 * SQL执行效率插件
	 */
	/*
	 * @Bean
	 * 
	 * @Profile({"dev","test"})// 设置 dev test 环境开启 public PerformanceInterceptor
	 * performanceInterceptor() { return new PerformanceInterceptor(); }
	 */

	/**
	 * 分页插件
	 */
	@Bean
	public PaginationInterceptor paginationInterceptor() {
		// 开启 count 的 join 优化,只针对 left join !!!
		return new PaginationInterceptor().setCountSqlParser(new JsqlParserCountOptimize(true));
	}
}
