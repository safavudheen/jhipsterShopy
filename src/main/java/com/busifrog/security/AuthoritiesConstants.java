package com.busifrog.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String SELLER_ADMIN = "ROLE_SELLER_ADMIN";

    public static final String CUSTOMER = "ROLE_CUSTOMER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    private AuthoritiesConstants() {}
}
