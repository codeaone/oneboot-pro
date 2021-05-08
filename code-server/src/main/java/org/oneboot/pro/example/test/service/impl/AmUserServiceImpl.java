package org.oneboot.pro.example.test.service.impl;

import org.oneboot.pro.example.test.entity.AmUser;
import org.oneboot.pro.example.test.mapper.AmUserMapper;
import org.oneboot.pro.example.test.service.IAmUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 告警用户信息 服务实现类
 * </p>
 *
 * @author jobob
 * @since 2020-12-12
 */
@Service
@Component
@Repository
public class AmUserServiceImpl extends ServiceImpl<AmUserMapper, AmUser> implements IAmUserService {

}
