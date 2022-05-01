package com.example.medicalcenterdemo.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JwtTokenProvider  {
    @Value("${jwt.secret}")
    private String secretKey;
//    @Value("${jwt.header}")
//    public static String authorizationHeader;
public static final String AUTHORIZATION_HEADER = "Authorization";
    @Value("${jwt.expiration}")
    private long expirationInMilliseconds;

    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public String createToken(String email,String Role)
    {
        Claims claims= Jwts.claims().setSubject(email);
        claims.put("role",Role);
        Date now = new Date();
        Date validity =new Date(now.getTime()+expirationInMilliseconds );

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256,secretKey)
                .compact();
    }

    public boolean validateToken (String token) throws JwtAuthorizationException {
        try {

            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        }
        catch (JwtException | IllegalArgumentException e)
        {
            throw  new JwtAuthorizationException("Jwt token is expire or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public String getEmail(String token)
    {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public Authentication getAuthentication (String token)
    {
     UserDetails userDetails = this.userDetailsService.loadUserByUsername(getEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }



}
