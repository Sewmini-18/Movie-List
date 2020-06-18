-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2020 at 04:58 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `users2`
--

CREATE TABLE `users2` (
  `id` int(5) NOT NULL,
  `name` text NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users2`
--

INSERT INTO `users2` (`id`, `name`, `dob`, `email`, `password`) VALUES
(9, 'node12', '2003-08-04', 'node12@gmail.com', '0000'),
(10, 'user2', '2000-01-10', 'user.we2@gmil.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist2`
--

CREATE TABLE `watchlist2` (
  `mid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `mname` varchar(100) NOT NULL,
  `ryear` varchar(4) DEFAULT NULL,
  `actors` varchar(250) DEFAULT NULL,
  `actress` varchar(250) DEFAULT NULL,
  `genre` varchar(100) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `imdb` varchar(3) DEFAULT NULL,
  `myrate` varchar(3) DEFAULT NULL,
  `wtimes` varchar(3) DEFAULT NULL,
  `wyear` varchar(4) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `inlist` tinyint(1) DEFAULT 0,
  `notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `watchlist2`
--

INSERT INTO `watchlist2` (`mid`, `userid`, `mname`, `ryear`, `actors`, `actress`, `genre`, `category`, `imdb`, `myrate`, `wtimes`, `wyear`, `url`, `inlist`, `notes`) VALUES
(1, 9, 'Premam', '2015', 'Nivin Pauly', 'Sai Pallawi', 'Malayalam', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(2, 10, 'Ek villain', '2017', 'Siddharth', NULL, 'Hindi', 'Crime, LoveStory', NULL, '7.1', '3', NULL, NULL, 1, 'movie'),
(3, 9, 'Anveshnam', '2020', '', '', 'Malayalam', 'Crime, Detective', '', '7.7', '1', '2020', '', 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users2`
--
ALTER TABLE `users2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `watchlist2`
--
ALTER TABLE `watchlist2`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `watchlist_fk` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users2`
--
ALTER TABLE `users2`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `watchlist2`
--
ALTER TABLE `watchlist2`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `watchlist2`
--
ALTER TABLE `watchlist2`
  ADD CONSTRAINT `watchlist_fk` FOREIGN KEY (`userid`) REFERENCES `users2` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
