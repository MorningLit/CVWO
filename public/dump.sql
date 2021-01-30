--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: todos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todos (
    id bigint NOT NULL,
    title character varying,
    description text,
    color character varying,
    completed boolean,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    start timestamp without time zone,
    "end" timestamp without time zone,
    tags character varying[] DEFAULT '{}'::character varying[]
);


--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying,
    password_digest character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    name character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2020-12-09 04:55:58.414661	2020-12-09 04:55:58.414661
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.schema_migrations (version) FROM stdin;
20201210065831
20201210074523
20201210083555
20201213081054
20201224132634
20210106130105
\.


--
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.todos (id, title, description, color, completed, user_id, created_at, updated_at, start, "end", tags) FROM stdin;
63	hello	test	#0693e3	f	4	2020-12-24 15:03:54.858144	2020-12-25 08:37:00.073534	2020-12-23 16:00:00	2020-12-30 16:00:00	{}
67	dab		#eb144c	f	4	2020-12-25 12:37:34.624344	2020-12-25 12:37:34.624344	2020-12-14 16:00:00	2020-12-24 14:00:00	{}
68	helloagain		#eb144c	f	4	2020-12-25 12:41:05.655025	2020-12-25 12:41:05.655025	2020-11-30 16:00:00	2020-12-01 16:00:00	{}
69	aaaa		#4caf50	f	4	2020-12-25 12:43:54.123047	2020-12-25 12:43:54.123047	2020-12-29 16:00:00	2020-12-30 16:00:00	{}
70	dab king		#4caf50	f	4	2020-12-25 12:44:31.228983	2020-12-25 12:54:55.347494	2020-12-28 16:30:00	2020-12-29 18:30:00	{}
71	aaaa		#fccb00	f	4	2020-12-25 12:55:08.184989	2020-12-25 12:55:08.184989	2020-12-16 13:00:00	2020-12-31 14:00:00	{}
72	hello	dsa	#2ccce4	f	4	2020-12-25 14:37:55.704183	2020-12-25 14:37:55.704183	2020-12-20 16:00:00	2020-12-28 16:00:00	{}
73	dasd		#4caf50	f	4	2020-12-25 14:39:55.905464	2020-12-25 14:39:55.905464	2020-12-16 14:00:00	2020-12-17 15:00:00	{}
74	aaaa		#4caf50	f	4	2020-12-25 14:53:50.43574	2020-12-25 14:53:50.43574	2020-12-22 15:00:00	2020-12-30 14:00:00	{}
76	dsa		#cccccc	f	4	2020-12-25 15:47:14.697558	2020-12-25 15:47:14.697558	2020-12-15 15:47:07	2020-12-30 15:47:07	{}
77	dsads		#2ccce4	f	4	2020-12-26 02:46:09.185664	2020-12-26 02:46:09.185664	2020-12-23 02:46:03	2020-12-31 02:46:03	{}
79	dab king		#4caf50	f	4	2020-12-26 02:55:41.745885	2020-12-26 02:55:41.745885	2020-12-15 02:55:30	2020-12-30 02:55:30	{}
80	aaaa		#fccb00	f	4	2020-12-26 02:56:32.55856	2020-12-26 02:56:32.55856	2020-12-07 02:56:22	2020-12-15 02:56:22	{}
75	helloaaa		#fccb00	f	4	2020-12-25 15:21:56.304893	2020-12-28 03:00:31.847599	2020-12-25 15:21:49.51	2020-12-25 15:21:49.51	{}
83	aaaa	dsa	#2ccce4	f	4	2020-12-28 02:48:25.125686	2020-12-28 08:40:50.948079	2020-12-28 02:48:17.077	2020-12-28 02:48:17.077	{}
86	sdsahelloaa	a	#eb144c	f	4	2021-01-04 12:35:06.816275	2021-01-06 07:41:26.307395	2020-12-29 12:35:01	2021-01-13 12:35:01	{}
84	aaaaaaaaaa	sss	#0693e3	t	4	2020-12-28 08:40:27.847216	2021-01-07 06:11:59.543551	2020-12-15 08:40:18	2020-12-30 08:40:18	{dab,king}
87	yo		#555555	f	4	2021-01-07 06:05:04.147058	2021-01-07 07:34:18.148666	2021-01-07 06:04:49.94	2021-01-07 06:04:49.94	{hahaha}
88	dab		#cccccc	f	4	2021-01-07 07:34:25.770033	2021-01-07 07:34:25.770033	2021-01-07 07:34:23.94	2021-01-07 07:34:23.94	{}
89	yoooo		#cccccc	f	4	2021-01-07 07:34:40.166564	2021-01-08 05:13:16.752927	2021-01-07 07:34:29.867	2021-01-07 07:34:29.867	{sssssss,test,testing}
91	ssss	sdas	#2ccce4	f	4	2021-01-07 07:42:28.969547	2021-01-09 04:05:48.193863	2021-01-07 07:42:26.384	2021-01-07 07:42:26.384	{asds,ss,dab}
90	dsing	swe	#eb144c	f	4	2021-01-07 07:37:46.118752	2021-01-09 04:06:06.478836	2021-01-06 07:37:26	2021-02-04 07:37:26	{heyllo,dsss,hey,dab}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password_digest, created_at, updated_at, name) FROM stdin;
1	abc@xyz.com	$2a$12$4BmCp5Q2RzT/JrXJ8EW4Ku03HUwVTOjlkkzFhUZYd9YwZ2TkZsxI6	2020-12-10 07:51:46.367263	2020-12-10 07:51:46.367263	\N
2	abcd@xyz.com	$2a$12$gh.yznI06HuKeKoCfxIxpu2qGpADJqdJZb2Wk.hGQHO1gNXaarv9G	2020-12-10 07:54:13.842835	2020-12-10 07:54:13.842835	\N
3	abcde@xyz.com	$2a$12$eyi7APmzhB.1WfBgzVLHlOsWeZkyhnqxbUloHtzVsK2KatnXFKbZm	2020-12-10 07:55:15.754338	2020-12-10 07:55:15.754338	hello
4	ambroseliew1998@gmail.com	$2a$12$v/BzvTpJljtln6UqB4KUje60p.D/vBqRvOZmcczHoVuPM3KyPae0q	2020-12-10 13:53:21.568098	2020-12-10 13:53:21.568098	Ambrose Liew
5	ambroses9822466a@gmail.com	$2a$12$95rD1bZagME4kzSoNYGhCOEP3Dt4lYwLF73EE06V1.oOU3tUuekqG	2020-12-11 04:58:19.520803	2020-12-11 04:58:19.520803	abc
6	test123@test.com	$2a$12$uHo6qoYbWsnWsYbZPaaFIe8tNkasM/Xl3RiSGsYhLpOLzYMsdcv0G	2020-12-11 05:03:07.728816	2020-12-11 05:03:07.728816	Ambrose Liew
7	e0424673@u.nus.edu	$2a$12$3ImUK7/FletgW1XXG5zp.upmnc5IAyjZ6IgKB5IANCydiHpYJquri	2020-12-11 05:06:51.087831	2020-12-11 05:06:51.087831	Ambrose Liew
8	abc@gmail.com	$2a$12$0CYW5Xmy9CKS4PZFOrwJw.9Ii2VB/4idTQ6CLYyEPmp2ScwOmsD22	2020-12-11 08:30:03.082087	2020-12-11 08:30:03.082087	Ambrose Liew
9	abc123@gmail.com	$2a$12$7gX/Y7yTHMaKLu0BWiQUcuMyWMZ1xtVKXcSOnVbqn3LBNDfZ8XQgi	2020-12-20 13:23:35.290594	2020-12-20 13:23:35.290594	Dabby
10	dab123@gmail.com	$2a$12$sIOzNosodNyn76ZU0aGhYe2cUrIQ9CT9gIBj3FRKD7BtRLeR4TrU.	2020-12-28 03:25:29.993559	2020-12-28 03:25:29.993559	teeemo
\.


--
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.todos_id_seq', 91, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_todos_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_todos_on_user_id ON public.todos USING btree (user_id);


--
-- Name: todos fk_rails_d94154aa95; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT fk_rails_d94154aa95 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

